"use client";
import Image from "next/image";
import { useState } from "react";
import { assets } from "../assets/assets";
import Sidebar from "@/components/Sidebar";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
            <div>
              <Message role="user" content="what is React js" />
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
