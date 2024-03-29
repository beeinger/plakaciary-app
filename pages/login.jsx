import { Button, IconInput } from "react-angled";
import React, { useContext, useState } from "react";

import GlobalContext from "context";
import Head from "next/head";
import ImageText from "components/ImageText";
import { RiShieldKeyholeFill } from "react-icons/ri";
import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  grid-template:
    ". . ." 5vh
    ". title ." 40vh
    ". input ." auto
    ". button ." auto
    ". . ." 5vh;
  row-gap: 40px;
  place-items: center;

  > div {
    grid-area: title;
  }

  > span {
    grid-area: input;
  }

  > button {
    grid-area: button;

    color: ${({ theme }) => theme.text} !important;
    border-color: ${({ theme }) => theme.secondary};
    background-image: linear-gradient(
      45deg,
      transparent 50%,
      ${({ theme }) => theme.secondary} 50%
    );
  }

  .input {
    width: 17.5vw;
    min-width: 200px;

    > input {
      width: calc(100% - (24px + 0.2em)) !important;
    }

    > svg {
      top: 0px;
    }
  }

  @media screen and (max-width: 600px) {
    .input {
      width: 40vw;
      > input {
        width: calc(100% - (24px + 0.2em)) !important;
      }
      > svg {
        top: 0px;
      }
    }
    grid-template:
      ". title ." 35vh
      ". input ." auto
      ". button ." auto;
  }
`;

export default function Login() {
  const [value, setValue] = useState(""),
    { setPassword } = useContext(GlobalContext);

  function handleSubmit(e) {
    if (e.key && e.key !== "Enter") return;
    setPassword(value);
  }

  return (
    <>
      <Head>
        <title>Password</title>
      </Head>
      <Layout>
        <div>
          <ImageText size="4.5em">PODAJ</ImageText>
          <ImageText size="4.5em">HASŁO</ImageText>
        </div>
        <span onKeyUp={handleSubmit}>
          <IconInput
            type="password"
            value={value}
            className="input"
            icon={RiShieldKeyholeFill}
            onChange={(e) => setValue(e.target.value)}
          />
        </span>
        <Button onClick={handleSubmit}>Zatwierdź</Button>
      </Layout>
    </>
  );
}
