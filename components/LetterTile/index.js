import React from "react";
import Letter from "../ImageText/Letter";
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

const Let = styled(Letter)`
  margin-top: 16px;
`;

export default function LetterTile({ letter }) {
  return (
    <Tile>
      <Let size="8em" char={letter} />
    </Tile>
  );
}
