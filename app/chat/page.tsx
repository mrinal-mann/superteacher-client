"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Image as ImageIcon,
  ArrowLeft,
  RefreshCw,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown"; // Add this import for rendering markdown

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  attachments?: string[];
  isGrading?: boolean; // Flag for assessment/grading responses
  subjectArea?: string; // Subject area detected for this message
}

// Create a separate client component to handle state
const ChatInterface = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = React.useState<string[]>([]);
  const [userId, setUserId] = React.useState<string>("");
  const [streamingMessage, setStreamingMessage] = React.useState<string>("");
  const [conversationState, setConversationState] =
    React.useState<string>("initial");
  const [detectedSubject, setDetectedSubject] = React.useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Monitor for session state changes in assistant messages
  React.useEffect(() => {
    // Check the most recent message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant") {
      // Detect grading completion
      if (
        lastMessage.content.includes("Do you want to grade another answer?") ||
        lastMessage.content.includes("## Student Assessment") ||
        lastMessage.content.includes("## Quick Assessment")
      ) {
        console.log("Detected completed grading assessment");
        setConversationState("complete");
        lastMessage.isGrading = true;
        resetFileUploadState();
      }
      // Detect waiting for image
      else if (
        lastMessage.content.includes("Please upload an image") ||
        lastMessage.content.includes("share an image")
      ) {
        console.log("Detected waiting for image upload");
        setConversationState("waiting_for_answer");
      }
      // Detect waiting for grading instruction
      else if (
        lastMessage.content.includes("How would you like me to evaluate") ||
        lastMessage.content.includes("How would you like me to grade")
      ) {
        console.log("Detected waiting for grading instructions");
        setConversationState("waiting_for_instruction");
      }

      // No need to detect and highlight specific subject areas anymore
    }
  }, [messages]);

  // Cleanup preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleSendMessage = async () => {
    if ((!inputValue.trim() && selectedFiles.length === 0) || isLoading) return;

    // Reset user ID for greeting messages
    if (inputValue.toLowerCase().match(/^(hi|hello|hey|greetings|start)\b/)) {
      console.log("Greeting message detected, starting fresh session");
      setUserId("");
      resetFileUploadState();
      setConversationState("initial");
    }

    // If we're in completed state and user sends a new message that's not a follow-up
    if (
      conversationState === "complete" &&
      !inputValue.toLowerCase().includes("why") &&
      !inputValue.toLowerCase().includes("explain") &&
      inputValue.length > 15
    ) {
      console.log("Starting new grading session with question:", inputValue);
      setConversationState("waiting_for_question");
    }

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
      attachments: previewUrls.length > 0 ? [...previewUrls] : undefined,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      if (selectedFiles.length > 0) {
        // Handle file uploads
        await sendFilesToBackend(inputValue);
      } else {
        // Handle text-only message
        await sendTextToBackend(inputValue);
      }
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content:
          "Sorry, there was an error processing your request. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      // Clear selected files and previews but don't reset userId
      setSelectedFiles([]);
      setPreviewUrls([]);
      setIsLoading(false);
    }
  };

  const sendTextToBackend = async (message: string) => {
    try {
      // Prepare for streaming
      setStreamingMessage("");

      // Ensure we have a userId - even if empty, generate a new one
      const currentUserId = userId || `user-${Date.now()}`;

      // If this is our first time using this ID, store it
      if (!userId) {
        console.log(`Generated new userId: ${currentUserId}`);
        setUserId(currentUserId);
      } else {
        console.log(`Using existing userId: ${currentUserId}`);
      }

      console.log(`Sending text message with userId: ${currentUserId}`);
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
        }/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream", // Request streaming response
          },
          body: JSON.stringify({
            message,
            userId: currentUserId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API response error: ${response.status}`);
      }

      // Check if the response is a stream
      if (response.headers.get("content-type")?.includes("text/event-stream")) {
        // Handle SSE (Server-Sent Events)
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("No reader available for stream");
        }

        let receivedText = "";

        // Read the stream
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          // Decode the chunk
          const chunk = decoder.decode(value, { stream: true });

          // Process SSE data
          const lines = chunk.split("\n\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const eventData = JSON.parse(line.substring(6));

                // Handle character-by-character streaming
                if (eventData.char) {
                  receivedText += eventData.char;
                  setStreamingMessage(receivedText);
                }
                // Handle userId messages
                else if (eventData.userId && !userId) {
                  setUserId(eventData.userId);
                }
                // Handle done messages
                else if (eventData.done) {
                  // Final message received, add to messages
                  if (receivedText) {
                    const newAssistantMessage: Message = {
                      id: Date.now().toString(),
                      content: receivedText,
                      role: "assistant",
                      timestamp: new Date(),
                    };

                    setMessages((prev) => [...prev, newAssistantMessage]);
                    setStreamingMessage("");
                  }
                }
              } catch (e) {
                console.error("Error parsing SSE data:", e);
              }
            }
          }
        }
      } else {
        // Handle non-streaming response
        const data = await response.json();

        const newAssistantMessage: Message = {
          id: Date.now().toString(),
          content: data.message,
          role: "assistant",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newAssistantMessage]);
      }
    } catch (error) {
      console.error("Error sending text message:", error);
      throw error;
    }
  };

  const sendFilesToBackend = async (textMessage: string) => {
    try {
      // Create form data with files and message
      const formData = new FormData();
      const currentUserId = userId || `user-${Date.now()}`;

      // If this is our first time using this ID, store it
      if (!userId) {
        console.log(`Generated new userId: ${currentUserId}`);
        setUserId(currentUserId);
      }

      // Append all data
      formData.append("userId", currentUserId);
      if (textMessage.trim()) {
        formData.append("message", textMessage);
      }
      selectedFiles.forEach((file) => {
        formData.append("image", file);
      });

      // Set conversation state to processing
      setConversationState("grading_in_progress");

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
        }/api/chat`,
        {
          method: "POST",
          headers: {
            Accept: "text/event-stream",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`API response error: ${response.status}`);
      }

      // Check if the response is a stream
      if (response.headers.get("content-type")?.includes("text/event-stream")) {
        // Handle SSE (Server-Sent Events)
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("No reader available for stream");
        }

        let receivedText = "";

        // Read the stream
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          // Decode the chunk
          const chunk = decoder.decode(value, { stream: true });

          // Process SSE data
          const lines = chunk.split("\n\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const eventData = JSON.parse(line.substring(6));

                // Handle character-by-character streaming
                if (eventData.char) {
                  receivedText += eventData.char;
                  setStreamingMessage(receivedText);
                }
                // Handle userId messages
                else if (eventData.userId && !userId) {
                  setUserId(eventData.userId);
                }
                // Handle done messages
                else if (eventData.done) {
                  // Final message received, add to messages
                  if (receivedText) {
                    const newAssistantMessage: Message = {
                      id: Date.now().toString(),
                      content: receivedText,
                      role: "assistant",
                      timestamp: new Date(),
                    };

                    setMessages((prev) => [...prev, newAssistantMessage]);
                    setStreamingMessage("");
                  }
                }
              } catch (e) {
                console.error("Error parsing SSE data:", e);
              }
            }
          }
        }
      } else {
        // Handle non-streaming response
        const data = await response.json();

        const newAssistantMessage: Message = {
          id: Date.now().toString(),
          content: data.message,
          role: "assistant",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newAssistantMessage]);
      }
    } catch (error) {
      console.error("Error sending files:", error);
      throw error;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Clear previous files first to ensure we're not accumulating files
      if (selectedFiles.length > 0 || previewUrls.length > 0) {
        resetFileUploadState();
      }

      const filesArray = Array.from(e.target.files);
      console.log(`Selected ${filesArray.length} new files`);

      setSelectedFiles(filesArray);

      // Create and store preview URLs
      const newPreviewUrls = filesArray.map((file) => {
        const url = URL.createObjectURL(file);
        console.log(`Created preview URL for file: ${file.name}`);
        return url;
      });

      setPreviewUrls(newPreviewUrls);
    } else {
      console.log("No files selected or file selection canceled");
    }
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);

    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });

    setPreviewUrls((prev) => {
      const newUrls = [...prev];
      newUrls.splice(index, 1);
      return newUrls;
    });
  };

  // Helper function to reset all file upload state
  const resetFileUploadState = () => {
    // Clear any selected files
    setSelectedFiles([]);

    // Revoke and clear preview URLs
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setPreviewUrls([]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    console.log("File upload state has been completely reset");
  };

  // Function to start a new grading session
  const handleStartNewSession = () => {
    setConversationState("initial");
    sendTextToBackend("Start a new grading session");
  };

  // Get input placeholder based on conversation state
  const getInputPlaceholder = () => {
    switch (conversationState) {
      case "initial":
        return "Type a question you want to grade or say 'hi' to get started...";
      case "waiting_for_question":
        return "What question or assignment would you like to assess?";
      case "waiting_for_answer":
        return "Upload an image of the student's work, or type additional context...";
      case "waiting_for_instruction":
        return "How would you like me to grade this? (e.g., 'Grade out of 10 points')";
      case "complete":
        return "Ask a follow-up question or start a new assessment...";
      default:
        return "Type your message or upload an image...";
    }
  };

  // Get contextual UI cues
  const getContextualHint = () => {
    if (isLoading) return null;

    switch (conversationState) {
      case "initial":
        return (
          <div className="text-sm text-gray-500 flex items-center mb-2">
            <HelpCircle className="w-4 h-4 mr-1" />
            <span>Start by sharing what you'd like to grade</span>
          </div>
        );
      case "waiting_for_answer":
        return (
          <div className="text-sm text-blue-500 flex items-center mb-2">
            <ImageIcon className="w-4 h-4 mr-1" />
            <span>Please upload an image of the student's work</span>
          </div>
        );
      case "waiting_for_instruction":
        return (
          <div className="text-sm text-purple-500 flex items-center mb-2">
            <span>
              Specify how you'd like this graded (e.g., "Grade out of 10
              points")
            </span>
          </div>
        );
      case "complete":
        return (
          <div className="text-sm text-green-500 flex items-center mb-2">
            <RefreshCw className="w-4 h-4 mr-1" />
            <button
              onClick={handleStartNewSession}
              className="underline hover:text-green-600"
            >
              Start new assessment
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center">
        <Link href="/" className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold text-[#0085FB]">
          Super<span className="text-black">Teacher</span> Grading Assistant
        </h1>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome message when no messages exist */}
        {messages.length === 0 && !streamingMessage && !isLoading && (
          <div className="text-center p-8 text-gray-500">
            <h2 className="text-xl font-semibold mb-2">
              Welcome to SuperTeacher!
            </h2>
            <p>Our AI assistant helps you grade student work in any subject.</p>
            <p className="mt-4 text-sm">To get started:</p>
            <ol className="text-left mt-2 mx-auto inline-block">
              <li>1. Share the question you're grading</li>
              <li>2. Upload an image of the student's work</li>
              <li>3. Tell us how you'd like it graded</li>
            </ol>
            <p className="mt-4">
              <button
                onClick={() => setInputValue("Hi")}
                className="text-[#0085FB] hover:underline"
              >
                Say "Hi" to begin
              </button>
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] rounded-lg p-4",
              message.role === "user"
                ? "bg-[#0085FB] text-white ml-auto"
                : message.isGrading
                ? "bg-white border-2 border-green-300 mr-auto"
                : "bg-white border border-gray-200 mr-auto"
            )}
          >
            <div className="mb-1 text-sm opacity-70">
              {message.role === "user" ? "You" : "SuperTeacher AI"}
            </div>

            {/* Render markdown for assistant messages */}
            {message.role === "assistant" ? (
              <div className="whitespace-pre-wrap prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{message.content}</div>
            )}

            {/* Display attachments if any */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {message.attachments.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Attachment ${i + 1}`}
                    className="rounded-md max-h-48 object-contain bg-gray-100"
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Streaming message */}
        {streamingMessage && (
          <div className="max-w-[85%] rounded-lg p-4 bg-white border border-gray-200 mr-auto">
            <div className="mb-1 text-sm opacity-70">SuperTeacher AI</div>
            <div className="whitespace-pre-wrap prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>{streamingMessage}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && !streamingMessage && (
          <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg p-3 max-w-[85%]">
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
            <div className="text-sm text-gray-500">
              SuperTeacher AI is{" "}
              {conversationState === "grading_in_progress"
                ? "grading"
                : "thinking"}
              ...
            </div>
          </div>
        )}

        {/* Invisible element for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* File preview area */}
      {previewUrls.length > 0 && (
        <div className="p-3 bg-white border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  className="h-20 w-20 object-cover rounded-md border border-gray-300"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-200">
        {getContextualHint()}

        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "rounded-full h-10 w-10 flex-shrink-0",
              conversationState === "waiting_for_answer" &&
                "animate-pulse border-blue-400"
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon
              className={cn(
                "h-5 w-5",
                conversationState === "waiting_for_answer" && "text-blue-500"
              )}
            />
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
          </Button>

          <div className="flex-1 relative">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={getInputPlaceholder()}
              className="min-h-[50px] max-h-[200px] pr-10 resize-none"
              ref={textareaRef}
            />
          </div>

          <Button
            className="rounded-full h-10 w-10 flex-shrink-0 bg-[#0085FB] hover:bg-[#0075e0]"
            onClick={handleSendMessage}
            disabled={
              (!inputValue.trim() && selectedFiles.length === 0) || isLoading
            }
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Page component that returns the client component
export default function ChatPage() {
  return <ChatInterface />;
}
