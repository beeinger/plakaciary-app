import React from "react";
import Letter from "../ImageText/Letter";
import styled from "styled-components";

const Tile = styled.div`
  border: 0.25px solid rgba(0, 0, 0, 0.5);
  height: 100%;
  border-radius: 8px;
  margin: 0px 4px 0px 4px;
  display: grid;
  box-sizing: border-box;
  place-items: center;

  grid-template:
    "letter" 60%
    "number" 40%
    / 100%;

  .letter {
    grid-area: letter;
  }

  .number {
    grid-area: number;
    font-family: "Pangolin", cursive;
    font-size: 1.1vw;
  }

  @media screen and (max-width: 992px) {
    .number {
      font-size: 4vw;
    }
  }

  @media screen and (max-width: 600px) {
    .number {
      font-size: 6vw;
    }
  }
`;

export default function LetterTile({ letter, number, size }) {
  return (
    <Tile>
      <Letter className="letter" char={letter} size={size} />
      <div className="number">{number}</div>
    </Tile>
  );
}
