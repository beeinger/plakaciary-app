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
            <ImageText className="imageText">{children}</ImageText>
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

  .imageText {
    overflow-x: hidden;
    padding-right: 40px;
    min-height: 22px;

    :hover {
      overflow-x: auto;
      padding-bottom: 0px;
    }
  }

  .imageText:hover::-webkit-scrollbar {
          height: 2px;
  }

  .imageText:hover::-webkit-scrollbar-thumb {
          background-color: #000000;
  }

  .overlay {
    width: 15%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 30%,
      rgba(255, 255, 255, 0.9) 70%,
      rgba(255, 255, 255, 1) 100%
    );
  }
`;

export default Slogan;
