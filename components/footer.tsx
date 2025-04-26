import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center mb-6">
              <div className="w-8 h-8 mr-2">
                <Image src="/whitelogo.png" alt="Logo" width={32} height={32} />
              </div>
              <span className="text-2xl font-bold text-white">
                Super<span className="text-white"> Teacher</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              India's First AI-Powered Grading Platform for Teachers. Save time,
              provide better feedback.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>   
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#product"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Get Early Access</h3>
            <p className="text-gray-400 mb-4">
              Join our waitlist to be among the first to experience Super
              Teacher.
            </p>
            <div className="flex" id="waitlist">
              <Input
                type="email"
                placeholder="Your email address"
                className="rounded-l-md rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-800 border-gray-700"
              />
              <Button className="rounded-l-none bg-white hover:bg-gray-200 text-black">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Super Teacher. All rights
            reserved.
          </p>
          <div className="flex justify-center md:justify-end space-x-6">
            <Link
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
