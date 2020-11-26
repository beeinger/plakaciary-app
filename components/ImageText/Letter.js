import React from "react";
import Image from "../Image";
import styled from "styled-components";
import { parseCharToImagePath } from "utils";

function _Letter({ char: _char, className }) {
  const char = parseCharToImagePath(_char);
  return char === " " ? (
    <span className={className} />
  ) : (
    <Image className={className} src={"alphabet/" + char + ".png"} alt={char} />
  );
}

const Letter = styled(_Letter)`
  width: 0.75em;
  height: 1em;
  font-family: "Coda Caption", sans-serif;
  font-size: ${({ size }) => size || "inherit"};
  line-height: 1em;
  display: inline-block;
  justify-self: center;
`;

export default Letter;
