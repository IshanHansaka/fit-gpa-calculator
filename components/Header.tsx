'use client';
import { useState, useEffect } from 'react';

const Header = () => {
  const [version, setVersion] = useState('');

  useEffect(() => {
    fetch('/api/version')
      .then((res) => res.json())
      .then((data) => setVersion(data.version))
      .catch(() => setVersion('v1.0.0'));
  }, []);
  return (
    <header className="text-center mb-4 md:mb-12">
      <div className="text-3xl md:text-4xl font-bold text-fuchsia-600 dark:text-fuchsia-400 mb-2">
      <div className="text-3xl md:text-4xl font-bold text-fuchsia-600 dark:text-fuchsia-400">
          🎓 FIT GPA Calculator
        </div>
      {/* Nuxt-style Version Badge */}
        {version && (
          <span className="px-2 py-0.5 text-xs font-mono font-semibold bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300 rounded-md border border-fuchsia-200 dark:border-fuchsia-800 shadow-sm">
            {version}
          </span>
        )}
      </div>
      <div className="text-sm md:text-lg text-gray-700 dark:text-gray-300">
        Calculate your SGPA and OGPA with the Faculty of Information Technology grading system
      </div>
    </header>
  );
};

export default Header;
