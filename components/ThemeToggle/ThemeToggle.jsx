import { FiMoon, FiSun } from "react-icons/fi";
import React, { useContext } from "react";

import GlobalContext from "context";
import styled from "styled-components";

const _ThemeToggle = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 999;

  > svg {
    cursor: pointer;
    color: ${({ disabled, theme }) =>
      disabled ? Color(theme.text).alpha(0.5).toString() : theme.text};
  }
`;

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(GlobalContext);

  return (
    <_ThemeToggle onClick={toggleTheme}>
      {theme === "dark" ? <FiSun size="40px" /> : <FiMoon size="40px" />}
    </_ThemeToggle>
  );
}
