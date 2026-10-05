'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Theme = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    document.documentElement.classList.add(initialTheme);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  if (theme === null) return null;

  return (
    <div className='fixed top-4 right-4 z-10 flex items-center gap-1 rounded-full border border-gray-200 bg-gray-100/90 p-1 text-gray-900 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-800/80 dark:text-white'>
      <a
        href='https://github.com/IshanHansaka/fit-gpa-calculator'
        target='_blank'
        rel='noopener noreferrer'
        className='group flex h-9 items-center rounded-full py-2 pl-4 pr-3 text-sm font-medium transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 dark:hover:bg-white/10'
      >
        <Image
          src={theme === 'light' ? '/star-light.svg' : '/star-dark.svg'}
          width={18}
          height={18}
          alt={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          className='shrink-0 transition-transform duration-700 ease-out group-hover:rotate-[72deg] group-hover:scale-125 group-focus-visible:rotate-[72deg] group-focus-visible:scale-125 motion-reduce:transition-none'
        />
        <span className='ml-2'>Star</span>
        <span
          aria-hidden='true'
          className='hidden max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-700 ease-out group-hover:max-w-[22rem] group-hover:opacity-100 group-focus-visible:max-w-[22rem] group-focus-visible:opacity-100 motion-reduce:transition-none sm:block'
        >
          <span className='text-fuchsia-600 dark:text-fuchsia-400 ml-1'>us on GitHub</span>
        </span>
      </a>

      <button
        type='button'
        onClick={toggleTheme}
        aria-label={
          theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
        }
        className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-gray-800 bg-white/60 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 dark:border-white/30 dark:bg-white/10 dark:hover:bg-white/20'
      >
        <Image
          src={theme === 'light' ? '/dark.svg' : '/light.svg'}
          width={18}
          height={18}
          alt={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        />
      </button>
    </div>
  );
};

export default Theme;
