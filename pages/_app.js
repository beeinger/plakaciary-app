import "react-toastify/dist/ReactToastify.css";
import "pure-react-carousel/dist/react-carousel.es.css";

import GlobalContext, { useData, useSearch, useSort } from "context";
import React, { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import Color from "color";
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
    --toastify-color-info: black !important;
    --toastify-color-success: black !important;
    --toastify-color-warning: black !important;
    --toastify-color-error: black !important;
  }

  .input {
    > input {
      color: ${({ theme }) => theme.text} !important;
      border: 1px solid ${({ theme }) => theme.secondary};
      background-image: linear-gradient(
        45deg,
        transparent 50%,
        ${({ theme }) => theme.secondary} 50%
      );
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
      `};
    background-color: ${({ theme }) => theme.skeleton};
  }
`;

function MyApp({ Component, pageProps }) {
  const data = useData(),
    search = useSearch(),
    sort = useSort(),
    [theme, setTheme] = useState("light");

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalContext.Provider
        value={{
          ...data,
          ...search,
          ...sort,
          ...{ theme, setTheme },
        }}
      >
        <ToastContainer />
        <Component {...pageProps} />
      </GlobalContext.Provider>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;
