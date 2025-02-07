"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Arrow = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 p-3 rounded-xl bg-fuchsia-400 dark:bg-fuchsia-600 shadow-lg transition-opacity duration-300 z-10 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image src="/arrow.svg" width={24} height={24} alt="Scroll to top" />
    </button>
  );
};

export default Arrow;
