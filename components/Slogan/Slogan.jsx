import React, { useState } from "react";

import CheckBox from "./CheckBox";
import Color from "color";
import ImageText from "../ImageText";
import TilesLine from "components/TilesLine";
import ToggleDropdown from "./ToggleDropdown";
import styled from "styled-components";

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
      {!disabled && dropdown && (
        <TilesLine slogans={[children]} margin="16px" />
      )}
    </>
  );
}

const _Slogan = styled.div`
  transition: all 0.25s ease;
  font-size: 1rem;
  position: relative;
  z-index: 1;
  margin-bottom: 8px;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  flex-flow: row nowrap;

  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  --width: 17.5%;
  @media screen and (max-width: 992px) {
    --width: 32.5%;
  }
  @media screen and (max-width: 600px) {
    --width: 42.5%;
  }

  .imageText {
    overflow-x: hidden;
    padding-right: 68px;
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
    background-color: ${({ theme }) => theme.text};
  }

  .overlay {
    width: var(--width);
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    cursor: default;
    background: linear-gradient(
      90deg,
      ${({ theme }) => Color(theme.body).alpha(0).toString()} 0%,
      ${({ theme }) => Color(theme.body).alpha(0.8).toString()} 30%,
      ${({ theme }) => Color(theme.body).alpha(0.9).toString()} 70%,
      ${({ theme }) => Color(theme.body).alpha(1).toString()} 100%
    );
  }
`;

export default Slogan;
