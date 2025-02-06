"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Theme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark");
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-600"
    >
      <Image
        src={theme === "light" ? "/dark.svg" : "/light.svg"}
        width={24}
        height={24}
        alt={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      />
    </button>
  );
};

export default Theme;
