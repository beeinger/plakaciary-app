import "react-toastify/dist/ReactToastify.css";
import "pure-react-carousel/dist/react-carousel.es.css";

import GlobalContext, { useData, useSearch, useSort, useTheme } from "context";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import Color from "color";
import Cookies from "universal-cookie";
import React from "react";
import ThemeToggle from "components/ThemeToggle";
import { ToastContainer } from "react-toastify";
import { themes } from "utils";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  button,
  input {
    font-family: "Josefin Sans", sans-serif !important;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.body};
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: black;
    border-radius: 5px;
  }

  html {
    --toastify-color-info: ${({ theme }) => theme.text} !important;
    --toastify-color-success: ${({ theme }) => theme.text} !important;
    --toastify-color-warning: ${({ theme }) => theme.text} !important;
    --toastify-color-error: ${({ theme }) => theme.text} !important;
    --toastify-toast-background: ${({ theme }) => theme.body} !important;

    .Toastify__toast-theme--light {
      background: ${({ theme }) => theme.body} !important;
    }

    .Toastify__close-button--light {
      color: ${({ theme }) => theme.text} !important;
    }

  }

  .input {
    > input {
      border: 1px solid ${({ theme }) => theme.secondary};
      background-image: linear-gradient(
        45deg,
        transparent 50%,
        ${({ theme }) => theme.secondary} 50%
      );
    }

    input:focus {
      color: ${({ theme }) => theme.text} !important;
    }

    > .blur {
      background: linear-gradient(
        90deg,
        ${({ theme }) => Color(theme.secondary).alpha(0).toString()} 0%,
        ${({ theme }) => Color(theme.secondary).alpha(0).toString()} 60%,
        ${({ theme }) => Color(theme.secondary).alpha(1).toString()} 85%,
        ${({ theme }) => Color(theme.secondary).alpha(1).toString()} 100%
      );
    }

    > .underline {
      background-color: ${({ theme }) => theme.text};
    }
  }

  .skeleton{
    background-image: ${({ theme }) =>
      `linear-gradient(
        90deg, 
        ${theme.skeleton}, 
        ${theme.skeleton2}, 
        ${theme.skeleton}
        )
      `} !important;
    background-color: ${({ theme }) => theme.skeleton} !important;
  }
`;

export default function App({ Component, pageProps, theme: _theme }) {
  const data = useData(),
    search = useSearch(),
    sort = useSort(),
    theme = useTheme(_theme);

  return (
    <ThemeProvider theme={themes[theme.theme]}>
      <GlobalContext.Provider
        value={{
          ...data,
          ...search,
          ...sort,
          ...theme,
        }}
      >
        <ToastContainer />
        <Component {...pageProps} />
        <ThemeToggle />
      </GlobalContext.Provider>
      <GlobalStyle />
    </ThemeProvider>
  );
}

App.getInitialProps = async ({ ctx: { req } }) => {
  if (!!req) {
    const cookies = new Cookies(req.headers.cookie),
      theme = cookies.get("theme"),
      themes = ["light", "dark"];

    if (themes.includes(theme)) return { theme };
  }
  return {};
};
