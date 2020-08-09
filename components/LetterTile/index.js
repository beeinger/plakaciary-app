import React from "react";
import styled from "styled-components";
import { Slide } from "pure-react-carousel";

const Tile = styled(Slide)`
  border: 2px solid black;
  height: 100%;
`;

export default function LetterTile() {
  return <Tile>LetterTile</Tile>;
}
