import React from "react";
import styled from "styled-components";

function _Image({ src, className }) {
  return (
    <div className={className}>
      <img src={require(`images/${src}?trace`).trace} />
      <img src={require(`images/${src}?webp`)} />
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
  }
`;

export default Image;
