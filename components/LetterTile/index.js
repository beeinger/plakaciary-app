import React from "react";
import Letter from "../ImageText/Letter";
import styled from "styled-components";

const Tile = styled.div`
  border: 0.25px solid rgba(0, 0, 0, 0.5);
  height: 98%;
  border-radius: 8px;
  margin: 0px 8px 0px 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .break {
    flex-basis: 100%;
    height: 0;
  }
`;

const Number = styled.div`
  font-family: "Pangolin", cursive;
  font-size: 2em;
`;

const Let = styled(Letter)`
  margin-top: 16px;
`;

export default function LetterTile({ letter, count }) {
  return (
    <Tile>
      <Let size="8em" char={letter} />
      <div className={"break"} />
      <Number>{count}</Number>
    </Tile>
  );
}
