"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Theme = () => {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.classList.add(initialTheme);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  if (theme === null) return null;

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-600 z-10"
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
