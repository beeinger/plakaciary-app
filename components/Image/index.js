import React from "react";
import styled from "styled-components";

function _Image({ src, alt, className }) {
  return (
    <div className={className}>
      <img alt={alt} src={require(`images/${src}?trace`).trace} />
      <img alt={alt} src={require(`images/${src}?webp`)} />
    </div>
  );
}

const Image = styled(_Image)`
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
  }
`;

export default Image;
