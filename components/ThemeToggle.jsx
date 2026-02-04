"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by ensuring we only render on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-700"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        // Show Moon if Dark (Tap to go Light)
        <Moon className="w-6 h-6 text-yellow-400" />
      ) : (
        // Show Sun if Light (Tap to go Dark)
        <Sun className="w-6 h-6 text-orange-500" />
      )}
    </button>
  );
};

export default ThemeToggle;