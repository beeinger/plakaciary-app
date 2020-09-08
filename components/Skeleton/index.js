import React from "react";
import styled, { css, keyframes } from "styled-components";

export default function Skeleton({
  count,
  duration,
  width,
  wrapper: Wrapper,
  height,
  circle,
  style: givenStyle,
  className: givenClassName,
  highlightColor,
  baseColor,
}) {
  const keyframe = keyframes`
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
  `;

  const styles = css`
    background-color: ${baseColor};
    background-image: linear-gradient(
      90deg,
      ${baseColor},
      ${highlightColor},
      ${baseColor}
    );
    background-size: 200px 100%;
    background-repeat: no-repeat;
    border-radius: 4px;
    display: inline-block;
    line-height: 1;
    width: 100%;
  `;

  const Span = styled.span`
    ${styles}
    animation: ${keyframe} ${duration}s ease-in-out infinite;
  `;

  const elements = [];

  for (let i = 0; i < count; i++) {
    let style = {};

    if (width !== null) {
      style.width = width;
    }

    if (height !== null) {
      style.height = height;
    }

    if (width !== null && height !== null && circle) {
      style.borderRadius = "50%";
    }

    let className = "skeleton";
    if (givenClassName) {
      className += " " + givenClassName;
    }

    elements.push(
      <Span
        key={i}
        className={className}
        style={{
          ...givenStyle,
          ...style,
        }}
      >
        &zwnj;
      </Span>
    );
  }

  return Wrapper
    ? elements.map((element, i) => (
        <Wrapper key={i} skeleton>
          {element}
          &zwnj;
        </Wrapper>
      ))
    : elements;
}

Skeleton.defaultProps = {
  count: 1,
  duration: 1.2,
  width: null,
  wrapper: null,
  height: null,
  circle: false,
  baseColor: "#eee",
  highlightColor: "#f5f5f5",
};
