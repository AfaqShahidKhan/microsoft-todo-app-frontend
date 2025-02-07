"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";
import Input from "./ui/Input";
import { LiaSearchSolid } from "react-icons/lia";
import { FcList } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import IconWithTooltip from "./ui/IconWithTooltip ";
import { GoPlus } from "react-icons/go";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import Button from "./ui/Button";

const LeftSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", photo: null });
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    router.push(`tasks?${createQueryString("title", e.target.value)}`);
  };

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

  const tooglePriorityDropdown = () => {
    setIsPriorityDropdownOpen(!isPriorityDropdownOpen);
  };

  return (
    <div className="bg-charcoal p-4 text-foreground">
      <div
        className="flex items-center justify-around"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
      >
        <div className="flex items-center space-x-3">
          <Image
            src={`http://localhost:5000/images/users/${user.photo}`}
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
          <Link href="/users/me" className="block px-4 py-2 hover:bg-gray-500">
            Manage Account
          </Link>
          <Link href="/settings" className="block px-4 py-2 hover:bg-gray-500">
            Settings
          </Link>
          <Link
            href="/"
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
          value={searchQuery}
          onChange={handleSearch}
          className="text-foreground ring-1 ring-gray-500 bg-charcoal"
          icon={<LiaSearchSolid />}
        />
      </div>
      <div className="mt-4">
        <ul className="space-y-2">
          <li className="hover:bg-gray-500 p-2 rounded-md">
            <Link href="/" className="flex items-center space-x-2">
              <span>☀️</span>
              <span>My Day</span>
            </Link>
          </li>
          <li className="hover:bg-gray-500 p-2 rounded-md">
            <div
              className="flex items-center justify-between"
              onClick={tooglePriorityDropdown}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && tooglePriorityDropdown()}
            >
              <div className="flex items-center space-x-3">
                <span>⭐</span>

                <div className="text-foreground">
                  <span>Priority/Important</span>
                </div>
              </div>

              <button
                className="flex items-center text-sm font-medium text-foreground rounded-full"
                type="button"
              >
                <LuArrowDownUp />
              </button>
            </div>
            {isPriorityDropdownOpen && (
              <div className="absolute mt-2 bg-charcoal divide-y divide-secondary rounded-lg shadow-sm  border border-gray-600 w-52 z-10">
                <Link
                  href={`${
                    "tasks" + "?" + createQueryString("priority", "high")
                  }`}
                  className="block px-4 py-2 hover:bg-gray-500"
                >
                  <span>🔺</span>
                  <span>High</span>
                </Link>
                <Link
                  href={`${
                    "tasks" + "?" + createQueryString("priority", "medium")
                  }`}
                  className="block px-4 py-2 hover:bg-gray-500"
                >
                  <span>⭕</span>
                  <span>Medium</span>
                </Link>
                <Link
                  href={`${
                    "tasks" + "?" + createQueryString("priority", "low")
                  }`}
                  className="block px-4 py-2 hover:bg-gray-500"
                >
                  <span>🔻</span>
                  <span>Low</span>
                </Link>
              </div>
            )}
          </li>
          <li className="hover:bg-gray-500 p-2 rounded-md">
            <Link href="tasks/overdue" className="flex items-center space-x-2">
              <span>
                <FcBullish />
              </span>
              <span>Planned/Overdue</span>
            </Link>
          </li>
          <li className="hover:bg-gray-500 p-2 rounded-md">
            <Link
              href="/assign-to-me"
              className="flex items-center space-x-2"
            >
              <span>🙍‍♂️ </span>
              <span>Assigned to Me</span>
            </Link>
          </li>
          <li className="hover:bg-gray-500 p-2 rounded-md">
            <Link href="/tasks" className="flex items-center space-x-2">
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
