import React, { useEffect } from "react";
import styled from "styled-components";
import { FiPrinter, FiChevronDown, FiChevronUp } from "react-icons/fi";
import usePDF from "customHooks/PDF";

function _ToggleDropdown({ dropdown, slogan, onClick, className }) {
  const print = usePDF(),
    handlePrint = () => print(slogan);

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

const ToggleDropdown = styled(_ToggleDropdown)`
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
    margin-right: 16px;
  }
`;

export default ToggleDropdown;
