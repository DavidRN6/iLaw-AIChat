/* ======================
  table of contents
=========================

  1. Imports
  2. Logo
  3. Toggle button
  4. Icon for mobile
  5. Icon for desktop
  6. Tooltip
  7. New Chat Button
  8. Chat Label
  9. Profile icon
*/

//==============
// 1. Imports
//==============
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";
import ChatLabel from "./ChatLabel";
import { useState } from "react";
import Image from "next/image";

const Sidebar = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk();
  const { user } = useAppContext();
  const [openMenu, setOpenMenu] = useState({ id: 0, open: false });

  return (
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${
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
              <h1 className="text-[#ABB2BD] text-2xl font-bold">
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
            hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg"
          >
            {/*===================
              4. Icon for mobile
            ======================*/}
            <Image
              src={assets.menu_icon}
              alt="menu_icon"
              className="md:hidden"
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
            <span className="absolute left-12 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              {expand ? "Close Sidebar" : "Open Sidebar"}
            </span>
          </div>
        </div>

        {/*===================
          7. New Chat Button
        ======================*/}
        <button
          className={`mt-8 flex items-center justify-center cursor-pointer
        ${
          expand
            ? "bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max"
            : "group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"
        }`}
        >
          <Image
            className={expand ? "w-6" : "w-7"}
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt="chat_icon"
          />
          <div
            className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100
          transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg
          pointer-events-none"
          >
            New Chat
            <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5"></div>
          </div>
          {expand && <p className="text-white font-medium">New Chat</p>}
        </button>

        {/*===============
          8. Chat Label
        ==================*/}
        <div
          className={`mt-8 text-white/25 text-sm ${
            expand ? "block" : "hidden"
          }`}
        >
          <p className="my-1">Recents</p>
          <ChatLabel openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </div>
      </div>

      {/*=================
        9. Profile icon
      ====================*/}

      <div
        onClick={user ? null : openSignIn}
        className={`flex items-center ${
          expand ? "hover:bg-white/10 rounded-lg" : "justify-center w-full"
        } gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer`}
      >
        {user ? (
          <UserButton />
        ) : (
          <Image src={assets.profile_icon} alt="profile_icon" className="w-7" />
        )}

        {expand && <span>My Profile</span>}
      </div>
    </div>
  );
};

export default Sidebar;
