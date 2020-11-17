import React, { useState } from "react";
import ImageText from "../ImageText";
import styled from "styled-components";
import ToggleDropdown from "./ToggleDropdown";
import TilesLine from "components/TilesLine";
import CheckBox from "./CheckBox";

function Slogan({ id, children, skeleton, disabled, checked, toggleChecked }) {
  const [dropdown, setDropdown] = useState(false),
    toggleDropdown = () => !disabled && !skeleton && setDropdown(!dropdown);

  return (
    <>
      <_Slogan disabled={disabled}>
        {skeleton ? (
          children
        ) : (
          <>
            {!disabled && (
              <CheckBox
                id={id}
                checked={checked}
                toggleChecked={toggleChecked}
              />
            )}
            <ImageText onClick={toggleDropdown} className="imageText">
              {children}
            </ImageText>
            <div className="overlay" />
            {!disabled && (
              <ToggleDropdown
                slogan={children}
                dropdown={dropdown}
                onClick={toggleDropdown}
              />
            )}
          </>
        )}
      </_Slogan>
      {!disabled && dropdown && <TilesLine slogans={[children]} />}
    </>
  );
}

const _Slogan = styled.div`
  transition: all 0.25s ease;
  font-size: 1rem;
  position: relative;
  z-index: 1;
  margin-bottom: 8px;
  background-color: #fff;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  flex-flow: row nowrap;

  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

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
    width: 17.5%;
    @media screen and (max-width: 992px) {
      width: 32.5%;
    }
    @media screen and (max-width: 600px) {
      width: 42.5%;
    }
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    cursor: default;
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
