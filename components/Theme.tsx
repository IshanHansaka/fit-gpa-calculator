'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

const Theme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-600 z-10"
    >
      <Image
        src={theme === 'light' ? '/dark.svg' : '/light.svg'}
        width={24}
        height={24}
        alt={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      />
    </button>
  );
};

export default Theme;
