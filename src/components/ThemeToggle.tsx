import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import "./ThemeToggle.css";

type Theme = "light" | "dark";

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("personality-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("personality-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${
        theme === "dark" ? "light" : "dark"
      } mode`}
      title={`Switch to ${
        theme === "dark" ? "light" : "dark"
      } mode`}
    >
      <span
        className={`theme-toggle-slider ${
          theme === "light" ? "theme-toggle-slider-light" : ""
        }`}
      >
        {theme === "dark" ? (
          <Moon size={17} strokeWidth={2.2} />
        ) : (
          <Sun size={17} strokeWidth={2.2} />
        )}
      </span>
    </button>
  );
}

export default ThemeToggle;