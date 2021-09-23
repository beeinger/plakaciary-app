import Letter from "../ImageText/Letter";
import React from "react";
import styled from "styled-components";

function _LetterTile({ className, letter, number, size, main }) {
  return (
    <div className={className}>
      <Letter className="letter" char={letter} size={size} />
      <div className="number">{number}</div>
    </div>
  );
}

const LetterTile = styled(_LetterTile)`
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
    font-size: ${({ main }) => (main ? "1.1vw" : "0.8vw")};
  }

  @media screen and (max-width: 992px) {
    .number {
      font-size: ${({ main }) => (main ? "2vw" : "1.2vw")};
    }
  }

  @media screen and (max-width: 600px) {
    .number {
      font-size: ${({ main }) => (main ? "3.5vw" : "1.7vw")};
    }
  }
`;

export default LetterTile;
