import React from "react";
import styled from "styled-components";

const Tile = styled.div`
  display: inline-block;
  border: 2px solid black;
  height: 90%;
  width: 30%;
  margin-top: 5%;
`;

export default function LetterTile() {
  return <Tile>LetterTile</Tile>;
}
