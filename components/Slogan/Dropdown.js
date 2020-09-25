import React from "react";
import styled from "styled-components";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import TilesLine from "../TilesLine";

export default function Dropdown({ slogan }) {
  const splittedSlogan = slogan.split("");
  var letters = [];

  function count(string, char) {
    var re = new RegExp(char, "gi");
    return string.match(re).length;
  }

  for (let i = 0; i < splittedSlogan.length; i++) {
    const number = count(slogan, splittedSlogan[i]);
    if (
      splittedSlogan[i] !== " " &&
      !letters.some((e) => e.letter === splittedSlogan[i])
    ) {
      letters.push({ letter: splittedSlogan[i], count: number });
    }
  }

  return (
    <div>
      <TilesLine length={letters.length} letters={letters} size="10vh" />
    </div>
  );
}

function _ToggleDropdown({ dropdown, onClick, className }) {
  return (
    <div className={className} onClick={onClick}>
      {dropdown ? <FiChevronUp /> : <FiChevronDown />}
    </div>
  );
}

export const ToggleDropdown = styled(_ToggleDropdown)`
  position: absolute;
  z-index: 999;
  top: 0;
  right: 0;
  height: 1em;
`;
