import { useState } from "react";

export default function useTheme(defaultTheme) {
  const [theme, setTheme] = useState(defaultTheme);

  return { theme, setTheme };
}
