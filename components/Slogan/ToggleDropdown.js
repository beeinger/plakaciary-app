import React, { useContext } from "react";
import styled from "styled-components";
import {
  FiPrinter,
  FiChevronDown,
  FiChevronUp,
  FiTrash2,
} from "react-icons/fi";
import { usePDF } from "utils";
import GlobalContext from "context";

function _ToggleDropdown({ dropdown, slogan, onClick, className }) {
  const { deleteSlogan } = useContext(GlobalContext),
    print = usePDF(),
    handleDelete = () => deleteSlogan(slogan),
    handlePrint = () => print(slogan);

  return (
    <div className={className}>
      <FiTrash2 onClick={handleDelete} />
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

  > :not(:last-child) {
    margin-right: 8px;
  }
`;

export default ToggleDropdown;
