import React from "react";
import styled from "styled-components";

function _Image({ src, alt, className }) {
  var src;
  try {
    src = `/letters/minimised/${src}.svg`;
  } catch (error) {
    src = `/letters/minimised/question_mark.svg`;
  }
  return <img className={className} alt={alt} src={src} />;
}

const Image = styled(_Image)`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
`;

export default Image;
