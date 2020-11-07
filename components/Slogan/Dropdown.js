import React from "react";
import styled from "styled-components";
import { FiChevronDown, FiChevronUp, FiPrinter } from "react-icons/fi";
import usePDF from "customHooks/PDF";

export default function Dropdown() {
  return <div>Work in progress</div>;
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
