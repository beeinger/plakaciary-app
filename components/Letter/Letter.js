import React from "react";
import Image from "../Image";
import styled from "styled-components";

function _Letter({ char, size, className }) {
  return char === " " ? (
    <span className={className} />
  ) : (
    <Image
      className={className}
      src={"alphabet/" + char.toUpperCase() + ".png"}
      alt={char.toUpperCase()}
    />
  );
}

const Letter = styled(_Letter)`
  width: 0.75em;
  height: 1em;
  font-family: "Coda Caption", sans-serif;
  font-size: ${({ size }) => size || "10vw"};
  line-height: 1em;
  display: inline-block;
`;

export default Letter;
