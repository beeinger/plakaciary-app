import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiPrinter, FiChevronDown, FiChevronUp } from "react-icons/fi";
import TilesLine from "../TilesLine";
import usePDF from "customHooks/PDF";

export default function Dropdown({ slogan }) {
  const splittedSlogan = slogan.split("");
  var letters = [];
  var sortedLetters = [];
  var counts = [];

  const [Device, setDevice] = useState();

  function count(string, char) {
    var re = new RegExp(char, "gi");
    return string.match(re).length;
  }

  function mobileCheck() {
    if (window.innerWidth <= 992) {
      if (window.innerWidth <= 600) {
        return "mobile";
      }
      return "tablet";
    }
  }

  useEffect(() => {
    setDevice(mobileCheck());
  }, []);

  for (let i = 0; i < splittedSlogan.length; i++) {
    const number = count(slogan, splittedSlogan[i]);
    if (
      splittedSlogan[i] !== " " &&
      !letters.some((e) => e.letter === splittedSlogan[i])
    ) {
      letters.push({ letter: splittedSlogan[i], count: number });
    }
  }

  letters.sort((a, b) => a.count - b.count);
  letters.reverse();

  for (let i = 0; i < letters.length; i++) {
    counts.push(letters[i].count);
  }

  const uniqNums = [...new Set(counts)];

  for (let i = 0; i < uniqNums.length; i++) {
    const num = uniqNums[i];
    var toSort = [];
    for (let j = 0; j < letters.length; j++) {
      if (letters[j].count === num) {
        toSort.push(letters[j]);
      }
    }
    toSort.sort((a, b) =>
      a.letter > b.letter ? 1 : b.letter > a.letter ? -1 : 0
    );
    for (let j = 0; j < toSort.length; j++) {
      sortedLetters.push(toSort[j]);
    }
  }

  return (
    <div>
      <TilesLine
        length={sortedLetters.length}
        letters={sortedLetters}
        size={
          Device === "mobile" ? "10vw" : Device === "tablet" ? "8vw" : "5vw"
        }
      />
    </div>
  );
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
