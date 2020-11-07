import React, { useState } from "react";
import styled from "styled-components";
import ImageText from "components/ImageText";
import { IconInput, Button } from "react-angled";
import { RiShieldKeyholeFill } from "react-icons/ri";

const Layout = styled.div`
  display: grid;
  grid-template:
    ". title ." 40vh
    ". input ." auto
    ". button ." auto;
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

export default function login({ data }) {
  const [value, setvalue] = useState("");

  function handleSubmit(e) {
    if (e.key && e.key !== "Enter") return;
    data.setPassword(value);
  }

  return (
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
          onChange={(e) => setvalue(e.target.value)}
        />
      </span>
      <Button onClick={handleSubmit}>Zatwierdź</Button>
    </Layout>
  );
}
