"use client";
import { useTheme } from "@mui/material";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import Link from "next/link";
import MenuItem from "./MenuItem";

const NavBar = () => {
  const theme = useTheme();
  const t = useTranslations("HomePage");

  return (
    <div
      className="flex justify-center gap-10 py-3 text-xl bg-amber-100 dark:bg-gray-600 "
      theme={theme}
    >
      <MenuItem title={t("navbar.trending")} param={"trending"} />
      <MenuItem title={t("navbar.topRated")} param={"topRated"} />
    </div>
  );
};

export default NavBar;
