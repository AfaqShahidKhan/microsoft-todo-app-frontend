"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";
import Input from "./ui/Input";
import { LiaSearchSolid } from "react-icons/lia";
import { FcList } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import IconWithTooltip from "./ui/IconWithTooltip ";
import { GoPlus } from "react-icons/go";

const LeftSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-charcoal p-4">
      <div
        className="flex items-center justify-around"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
      >
        <div className="flex items-center space-x-3">
          <Image
            src="/images/users/user-1.jpg"
            width={50}
            height={50}
            alt="User Profile"
            className="rounded-full cursor-pointer"
          />
          <div className="text-foreground">
            <div className="font-medium cursor-pointer">{user.name}</div>
            <div className="text-sm text-gray-300 cursor-pointer">
              {user.email}
            </div>
          </div>
        </div>

        <button
          className="flex items-center text-sm font-medium text-foreground rounded-full"
          type="button"
        >
          <LuArrowDownUp />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute mt-2 bg-charcoal divide-y divide-secondary rounded-lg shadow-sm  border border-gray-600 w-64 z-10">
          <Link href="/me" className="block px-4 py-2 hover:bg-gray-500">
            Manage Account
          </Link>
          <Link href="/settings" className="block px-4 py-2 hover:bg-gray-500">
            Settings
          </Link>
          <Link
            href="/signout"
            className="block px-4 py-2 text-sm text-foreground hover:bg-gray-500"
          >
            Sign out
          </Link>
        </div>
      )}

      <div className="mt-3 ">
        <Input
          type="text"
          placeholder="Search..."
          className=" text-foreground ring-1 ring-gray-500 bg-charcoal"
          icon={<LiaSearchSolid />}
        />
      </div>
      <div className="mt-4">
        <ul className="space-y-2">
          <li className="hover:bg-gray-500 p-2 rounded-md">
            <Link href="/my-day" className="flex items-center space-x-2">
              <span>☀️</span>
              <span>My Day</span>
            </Link>
          </li>
          <li className="hover:bg-gray-500 p-2 rounded-md">
            <Link href="/important" className="flex items-center space-x-2">
              <span>⭐</span>
              <span>Important</span>
            </Link>
          </li>
          <li className="hover:bg-gray-500 p-2 rounded-md">
            <Link href="/planned" className="flex items-center space-x-2">
              <span>
                <FcBullish />
              </span>
              <span>Planned</span>
            </Link>
          </li>
          <li className="hover:bg-gray-500 p-2 rounded-md">
            <Link
              href="/assigned-to-me"
              className="flex items-center space-x-2"
            >
              <span>🙍‍♂️ </span>
              <span>Assigned to Me</span>
            </Link>
          </li>
          <li className="hover:bg-gray-500 p-2 rounded-md">
            <Link
              href="/assigned-to-me"
              className="flex items-center space-x-2"
            >
              <span>
                <FcList />
              </span>
              <span>Tasks</span>
            </Link>
          </li>
        </ul>
      </div>
      <hr />
      <div className="mt-4">
        <ul className="space-y-2">
          <li className="hover:bg-gray-500 p-2 rounded-md">
            <Link href="/started" className="flex items-center space-x-2">
              <span>👋</span>
              <span>Getting Started</span>
            </Link>
          </li>
          <li className="hover:bg-gray-500 p-2 rounded-md">
            <Link href="/grocceries" className="flex items-center space-x-2">
              <span>🛒</span>
              <span>Grocceries</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-24 flex items-center justify-between ">
        <Link href="/tasks/new" className="flex items-center gap-4 ml-2">
          {" "}
          <IconWithTooltip icon={GoPlus} tooltip="Add a List" />
          New List
        </Link>
        <IconWithTooltip
          icon={MdOutlineCreateNewFolder}
          tooltip="Create a new group"
        />
      </div>
    </div>
  );
};

export default LeftSidebar;
