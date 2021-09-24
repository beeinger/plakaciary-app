import { useCookie } from "utils";
import { useEffect } from "react";

const getClientsTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export default function useTheme(defaultTheme) {
  const [theme, setTheme] = useCookie("theme", defaultTheme || "light", true),
    toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    if (defaultTheme) return;
    setTheme(getClientsTheme());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    theme,
    toggleTheme,
  };
}
