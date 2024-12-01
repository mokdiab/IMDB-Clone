"use client";
import ThemeToggleButton from "../ThemeToggleButton";

import NavLinks from "./NavLinks";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Button, useTheme } from "@mui/material";
import LanguageSwitcher from "../LanguageSwitcher";
const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const theme = useTheme();
  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };
  return (
    <div className="header flex flex-row items-center align-element py-3">
      <div className="w-1/2 flex items-center justify-start">
        <div className="block md:hidden">
          <Button onClick={toggleNav}>
            <FaBars />
          </Button>
        </div>
        <div
          className={`fixed inset-0 flex flex-col gap-6 items-start p-6 z-10 transform transition-transform duration-300 ${
            theme.palette.mode === "dark"
              ? "bg-gray-900 bg-opacity-90"
              : "bg-white"
          } ${isNavOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
        >
          <div className="w-full flex justify-between">
            <h2 className="text-2xl">
              <span className="font-bold bg-amber-500 py-1 px-2 rounded-lg mr-1">
                IMDB
              </span>
            </h2>
            <button className="text-2xl mb-5 self-end" onClick={toggleNav}>
              &times;
            </button>
          </div>
          <ul className="flex flex-col gap-4">
            <NavLinks />
          </ul>
        </div>

        <div className="hidden md:block">
          <ul className="flex gap-10 text-xl">
            <NavLinks />
          </ul>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-end gap-5">
        <div className=" flex items-center">
          <ThemeToggleButton />
        </div>
        <LanguageSwitcher />
        <div className="logo-container items-center gap-2 text-lg  hidden md:flex">
          <h2 className="text-2xl">
            <span className="font-bold bg-amber-500 py-1 px-2 rounded-lg mr-1">
              IMDB
            </span>
            <span className="text-xl">Clone</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
