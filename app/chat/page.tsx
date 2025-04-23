"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Image as ImageIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  attachments?: string[]
}

// Create a separate client component to handle state
const ChatInterface = () => {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm here to help grade your assignments. Upload a photo or type your question to get started.",
      role: "assistant",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])
  const [previewUrls, setPreviewUrls] = React.useState<string[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Cleanup preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [previewUrls])

  const handleSendMessage = async () => {
    if ((!inputValue.trim() && selectedFiles.length === 0) || isLoading) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
      attachments: previewUrls.length > 0 ? [...previewUrls] : undefined
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputValue("")
    setSelectedFiles([])
    setPreviewUrls([])
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const newAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've received your message! This is a placeholder response. In a real implementation, this would be replaced with an actual AI response.",
        role: "assistant",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, newAssistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles(prev => [...prev, ...filesArray])
      
      // Create and store preview URLs
      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file))
      setPreviewUrls(prev => [...prev, ...newPreviewUrls])
    }
  }

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index])
    
    setSelectedFiles(prev => {
      const newFiles = [...prev]
      newFiles.splice(index, 1)
      return newFiles
    })
    
    setPreviewUrls(prev => {
      const newUrls = [...prev]
      newUrls.splice(index, 1)
      return newUrls
    })
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center">
        <Link href="/" className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold text-[#0085FB]">Super<span className="text-black">Teacher</span> Grading Assistant</h1>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={cn(
              "max-w-[85%] rounded-lg p-4",
              message.role === "user" 
                ? "bg-[#0085FB] text-white ml-auto" 
                : "bg-white border border-gray-200 mr-auto"
            )}
          >
            <div className="mb-1 text-sm opacity-70">
              {message.role === "user" ? "You" : "SuperTeacher AI"}
            </div>
            <div className="whitespace-pre-wrap">{message.content}</div>
            
            {/* Display attachments if any */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {message.attachments.map((url, i) => (
                  <img 
                    key={i} 
                    src={url} 
                    alt={`Attachment ${i+1}`} 
                    className="rounded-md max-h-48 object-contain bg-gray-100"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg p-3 max-w-[85%]">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
            <div className="text-sm text-gray-500">SuperTeacher AI is thinking...</div>
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
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-10 w-10 flex-shrink-0"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="h-5 w-5" />
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
              placeholder="Type your message or upload an image..."
              className="min-h-[50px] max-h-[200px] pr-10 resize-none"
              ref={textareaRef}
            />
          </div>
          
          <Button 
            className="rounded-full h-10 w-10 flex-shrink-0 bg-[#0085FB] hover:bg-[#0075e0]"
            onClick={handleSendMessage}
            disabled={(!inputValue.trim() && selectedFiles.length === 0) || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Page component that returns the client component
export default function ChatPage() {
  return <ChatInterface />
} 