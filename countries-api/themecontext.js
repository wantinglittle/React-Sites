import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const moon = "fa-solid fa-moon"
  const sun = "fa-solid fa-sun-bright"

  const [theme, setTheme] = useState("light");
  const [themeText, setThemeText] = useState("Dark Mode");
  const [themeIcon, setThemeIcon] = useState(moon);
  const themeToggle = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    themeText === "Dark Mode"
      ? setThemeText("Light Mode")
      : setThemeText("Dark Mode");
    themeIcon === moon
      ? setThemeIcon(sun)
      : setThemeIcon(moon);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeText, themeToggle, themeIcon }}>
      {children}
    </ThemeContext.Provider>
  );
}
