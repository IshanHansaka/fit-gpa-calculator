"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Theme = () => {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const appliedTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : systemTheme;

    setTheme(appliedTheme);
    document.documentElement.classList.add(appliedTheme);
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    document.documentElement.classList.replace(theme, newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!theme) return null;

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
