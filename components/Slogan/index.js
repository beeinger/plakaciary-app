import React, { useState } from "react";
import ImageText from "../ImageText";
import styled from "styled-components";
import Dropdown, { ToggleDropdown } from "./Dropdown";

function _Slogan({ children, skeleton, className }) {
  const [dropdown, setDropdown] = useState(false);

  function toggleDropdown() {
    setDropdown(!dropdown);
  }

  return (
    <>
      <div
        className={className}
        onClick={!skeleton ? toggleDropdown : undefined}
      >
        {skeleton ? (
          children
        ) : (
          <>
            <ImageText>{children}</ImageText>
            <div className="overlay" />
            <ToggleDropdown dropdown={dropdown} />
          </>
        )}
      </div>
      {dropdown && <Dropdown />}
    </>
  );
}

const Slogan = styled(_Slogan)`
  transition: all 0.25s ease;
  font-size: 1rem;
  position: relative;
  z-index: 1;
  margin-bottom: 8px;
  background-color: #fff;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;

  .overlay {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.7091211484593838) 30%,
      rgba(255, 255, 255, 1) 70%,
      rgba(255, 255, 255, 1) 100%
    );
  }
`;

export default Slogan;
