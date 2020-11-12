import React from "react";
import styled from "styled-components";
import { FiPrinter, FiChevronDown, FiChevronUp } from "react-icons/fi";
import TilesLine from "../TilesLine";
import usePDF from "customHooks/PDF";

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

  return <TilesLine letters={letters} />;
}

function _ToggleDropdown({ dropdown, slogan, onClick, className }) {
  const print = usePDF();
  function handlePrint() {
    print(slogan);
  }

  return (
    <div className={className}>
      <FiPrinter onClick={handlePrint} />
      {dropdown ? (
        <FiChevronUp onClick={onClick} />
      ) : (
        <FiChevronDown onClick={onClick} />
      )}
    </div>
  );
}

export const ToggleDropdown = styled(_ToggleDropdown)`
  cursor: default;
  position: absolute;
  z-index: 999;
  top: 0;
  right: 0;
  height: 1em;

  > * {
    cursor: pointer;
  }

  > :first-child {
    margin-right: 8px;
  }
`;
