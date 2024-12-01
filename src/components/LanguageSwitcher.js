"use client";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";

export default function LanguageSwitcher() {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const currentLocale = useLocale();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (locale) => {
    document.cookie = `locale=${locale}; path=/`;
    router.replace(window.location.pathname);
    router.refresh();
    handleClose();
  };

  return (
    <div className="relative inline-block text-left">
      <Button
        id="language-button"
        aria-controls={isOpen ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={handleClick}
        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
      >
        {currentLocale === "en"
          ? "English"
          : currentLocale === "fr"
          ? "Français"
          : "العربية"}
      </Button>

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "language-button",
        }}
      >
        <MenuItem
          onClick={() => changeLanguage("en")}
          disabled={currentLocale === "en"}
        >
          {t("LanguageMenu.en")}
        </MenuItem>
        <MenuItem
          onClick={() => changeLanguage("fr")}
          disabled={currentLocale === "fr"}
        >
          {t("LanguageMenu.fr")}
        </MenuItem>
        <MenuItem
          onClick={() => changeLanguage("ar")}
          disabled={currentLocale === "ar"}
        >
          {t("LanguageMenu.ar")}
        </MenuItem>
      </Menu>
    </div>
  );
}
