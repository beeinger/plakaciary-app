import React from "react";
import Letter from "../ImageText/Letter";
import styled from "styled-components";

const Tile = styled.div`
  border: 0.25px solid rgba(0, 0, 0, 0.5);
  height: 100%;
  border-radius: 8px;
  margin: 0px 4px 0px 4px;
  display: grid;
  align-items: flex-start;
  padding-top: 16px;
  box-sizing: border-box;

  .number {
    justify-self: center;
    align-self: center;
    font-family: "Pangolin", cursive;
    font-size: 3vw;
  }

  @media screen and (max-width: 992px) {
    .number {
      font-size: 4vw;
    }
  }

  @media screen and (max-width: 600px) {
    padding-top: 8px;
    .number {
      font-size: 6vw;
    }
  }
`;

export default function LetterTile({ letter, number, size }) {
  return (
    <Tile>
      <Letter char={letter} size={size} />
      <div className="number">{number}</div>
    </Tile>
  );
}
