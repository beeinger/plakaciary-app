import React from "react";
import Image from "../Image";
import styled from "styled-components";

function _Letter({ char, className }) {
  return <Image className={className} src={"alphabet/" + char + ".png"} />;
}

const Letter = styled(_Letter)`
  width: 1em;
  height: 1em;
  font-family: "Coda Caption", sans-serif;
  font-size: ${({ size }) => size || "7.5vw"};
  line-height: 1em;
  display: inline-block;
`;

export default Letter;
