"use client";
/* ======================
  table of contents
=========================

  1. Imports
  2. Logo
  3. Toggle button
  4. Icon for mobile
  5. Icon for desktop
  6. Tooltip
  7. Internships Button
  8. New Chat Button
  9. Chat Label
  10. Profile icon
*/

//==============
// 1. Imports
//==============
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";
import ChatLabel from "./ChatLabel";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CgMenuLeftAlt } from "react-icons/cg";
import { TbMessageCirclePlus } from "react-icons/tb";
import toast from "react-hot-toast";

const Sidebar = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk();
  const { user, chats, createNewChat } = useAppContext();
  const [openMenu, setOpenMenu] = useState({ id: 0, open: false });
  const [isClient, setIsClient] = useState(false);

  // // نتأكد إن الكود يشتغل بعد تحميل الكلاينت فقط
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // // أول Render هيكون مطابق للـ SSR
  // if (!isClient) {
  //   return (
  //     <div className="sm:flex items-center justify-center hidden h-screen bg-primary">
  //       <Image
  //         src={assets.logo_icon}
  //         alt="loading"
  //         className="w-12 animate-pulse"
  //       />
  //     </div>
  //   );
  // }

  return (
    <div
      className={`flex flex-col justify-between bg-primary pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${
        expand ? "p-4 w-64" : "md:w-20 w-0 max-md:overflow-hidden"
      }`}
    >
      <div>
        <div
          className={`flex ${
            expand ? "flex-row gap-10" : "flex-col items-center gap-8"
          }`}
        >
          {/*=========
            2. Logo
          ============*/}
          {expand ? (
            <div className="flex items-center gap-3">
              <h1 className="text-secondary text-2xl font-bold">
                iLaw AI Chat
              </h1>
            </div>
          ) : (
            <Image className="w-12" src={assets.logo_icon} alt="logo_icon" />
          )}

          {/*=================
            3. Toggle button
          ====================*/}
          <div
            onClick={() => setExpand(!expand)}
            className="group relative flex items-center cursor-pointer justify-center
            transition-all duration-300 h-9 w-9 aspect-square rounded-lg"
          >
            {/*===================
              4. Icon for mobile
            ======================*/}
            <CgMenuLeftAlt
              alt="menu_icon"
              className="md:hidden rotate-180 text-secondary text-4xl"
            />
            {/*====================
              5. Icon for desktop
            =======================*/}
            <Image
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              alt="sidebar_icon"
              className="hidden md:block w-7"
            />

            {/*===========
              6. Tooltip
            ==============*/}
            <span className="absolute left-12 whitespace-nowrap bg-secondary text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              {expand ? "Close Sidebar" : "Open Sidebar"}
            </span>
          </div>
        </div>

        {/*=======================
          7. Internships Button
        ==========================*/}
        <button
          onClick={() => toast("🚀 Coming soon...")}
          className={`mt-8 flex items-center justify-center cursor-pointer
        ${
          expand
            ? "bg-secondary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max"
            : "hidden"
        }`}
        >
          <Image
            src={assets.internships}
            className="w-8 text-white"
            alt="chat_icon"
          />
          <div
            className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100
          transition bg-secondary text-sm px-3 py-2 rounded-lg shadow-lg
          pointer-events-none"
          >
            Internships
            <div className="w-3 h-3 absolute bg-secondary rotate-45 left-4 -bottom-1.5"></div>
          </div>
          {expand && <p className="text-primary font-medium">Internships</p>}
        </button>

        {/*===================
          8. New Chat Button
        ======================*/}
        <button
          onClick={createNewChat}
          className={`mt-8 flex items-center justify-center cursor-pointer
        ${
          expand
            ? "bg-secondary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max"
            : "group relative h-9 w-9 mx-auto  rounded-lg"
        }`}
        >
          <TbMessageCirclePlus
            className={expand ? "text-xl" : "text-2xl text-white/60"}
            alt="chat_icon"
          />
          <div
            className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100
          transition bg-secondary text-sm px-3 py-2 rounded-lg shadow-lg
          pointer-events-none"
          >
            New Chat
            <div className="w-3 h-3 absolute bg-secondary rotate-45 left-4 -bottom-1.5"></div>
          </div>
          {expand && <p className="text-primary font-medium">New Chat</p>}
        </button>

        {/*===============
          9. Chat Label
        ==================*/}
        <div
          className={`mt-8 text-secondary text-sm ${
            expand ? "block" : "hidden"
          }`}
        >
          <p className="my-1">Recents</p>
          {chats.map((chat, index) => (
            <ChatLabel
              key={index}
              name={chat.name}
              id={chat._id}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          ))}
        </div>
      </div>

      {/*=================
        10. Profile icon
      ====================*/}
      <div
        onClick={user ? null : openSignIn}
        className={`flex items-center ${
          expand ? "rounded-lg" : "justify-center w-full"
        } gap-3 text-secondary text-sm p-2 mt-2 cursor-pointer`}
      >
        {user ? (
          <UserButton />
        ) : (
          <Image src={assets.profile_icon} alt="profile_icon" className="w-7" />
        )}

        {expand && <span className="text-secondary">My Profile</span>}
      </div>
    </div>
  );
};

export default Sidebar;
