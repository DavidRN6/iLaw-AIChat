"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import Sidebar from "@/components/Sidebar";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedChat } = useAppContext();
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div>
      <div className="flex h-screen">
        {/*======================
          2. Sidebar Component
        =========================*/}
        <Sidebar expand={expand} setExpand={setExpand} />

        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute top-6 px-4 flex items-center justify-between w-full">
            {/*========================
              3. Menu icon for mobile
            ===========================*/}
            <Image
              onClick={() => (expand ? setExpand(false) : setExpand(true))}
              className="rotate-180 cursor-pointer"
              src={assets.menu_icon}
              alt="menu_icon"
            />
            {/*========================
              4. Chat icon for mobile
            ===========================*/}
            <Image
              className="opacity-70 cursor-pointer"
              src={assets.chat_icon}
              alt="chat_icon"
            />
          </div>

          {/*=======================================
            5. Welcome message when no chats exist
          ==========================================*/}
          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image
                  src={assets.logo_icon}
                  alt="logo_icon"
                  className="w-20"
                />
                <p className="text-2xl font-medium">Hi, I'm iLaw.</p>
              </div>
              <p className="text-sm mt-2">How can I help you today?</p>
            </>
          ) : (
            <div
              ref={containerRef}
              className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto"
            >
              <p className="fixed top-8 border border-transparent hover:border-t-gray-500/50 py-1 px-2 rounded-lg font-semibold mb-6">
                {selectedChat.name}
              </p>
              {messages.map((msg, index) => (
                <Message
                  key={msg._id || index}
                  role={msg.role}
                  content={
                    typeof msg.content === "string"
                      ? msg.content
                      : JSON.stringify(msg.content)
                  }
                />
              ))}
              {isLoading && (
                <div className="flex gap-4 max-w-3xl w-full py-3">
                  <Image
                    src={assets.logo_icon}
                    alt="Logo"
                    className="h-9 w-9 p-1 border border-white/15 rounded-full"
                  />
                  <div className="loader flex justify-center items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  </div>
                </div>
              )}
            </div>
          )}

          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />

          <p className="text-xs absolute bottom-1 text-gray-500">
            AI-generated, for reference only. made by David Raoof
          </p>
        </div>
      </div>
    </div>
  );
}
