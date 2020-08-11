import React from "react";
import styled from "styled-components";

const Tile = styled.div`
  border: 0.25px solid rgba(0, 0, 0, 0.5);
  height: 98%;
  border-radius: 8px;
  margin: 0px 8px 0px 8px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export default function LetterTile({ letter }) {
  return <Tile>{letter}</Tile>;
}
