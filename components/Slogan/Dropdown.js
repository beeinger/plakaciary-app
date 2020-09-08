import React from "react";
import styled from "styled-components";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Dropdown() {
  return <div>Carousel</div>;
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
