import React, { useContext, useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import { GoPlus } from "react-icons/go";
import { FiPrinter, FiTrash2 } from "react-icons/fi";
import {
  FaSortAlphaDownAlt,
  FaSortAlphaDown,
  FaSortNumericDownAlt,
  FaSortNumericDown,
} from "react-icons/fa";
import { usePDF } from "utils";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import GlobalContext from "context";

function Search({ disabled }) {
  const [value, setValue] = useState(""),
    [alphAlt, setAlphaAlt] = useState(false),
    [numAlt, setNumAlt] = useState(true),
    {
      query,
      data,
      addSlogan,
      setQuery,
      checked,
      toggleAll,
      deleteChecked,
      setSortOrder,
    } = useContext(GlobalContext),
    hide = query.join(" ").length < 1 || data.slogans.includes(query.join(" ")),
    handleChangeValue = (e) => {
      setValue(e.target.value);
      setQuery(e.target.value.toUpperCase().split(" "));
    },
    handleAdd = (e) => {
      if (hide || (e.key && e.key !== "Enter")) return;
      addSlogan(query.join(" "));
      handleChangeValue({ target: { value: "" } });
    },
    handleAlphSort = () => {
      const _alphAlt = !alphAlt;
      setAlphaAlt(_alphAlt);
      _alphAlt ? setSortOrder("alphDescending") : setSortOrder("alphAscending");
    },
    handleNumSort = () => {
      const _numAlt = !numAlt;
      setNumAlt(_numAlt);
      _numAlt ? setSortOrder("numDescending") : setSortOrder("numAscending");
    },
    print = usePDF(),
    handlePrint = () => !disabled && checked.length && print(checked.join(" "));

  return (
    <_Search hide={hide}>
      <div className="search">
        <Input
          placeholder="Search/Add"
          value={value}
          onChange={handleChangeValue}
          onKeyUp={handleAdd}
          disabled={disabled}
        />
        <div className="overlay" />
        <GoPlus className="add" onClick={handleAdd} />
      </div>
      <div className="buttons_top">
        {checked.length ? (
          <MdCheckBox onClick={toggleAll} />
        ) : (
          <MdCheckBoxOutlineBlank onClick={toggleAll} />
        )}
        <FiPrinter onClick={handlePrint} />
        <FiTrash2 onClick={deleteChecked} />
      </div>
      <div className="buttons_bottom">
        {alphAlt ? (
          <FaSortAlphaDownAlt onClick={handleAlphSort} />
        ) : (
          <FaSortAlphaDown onClick={handleAlphSort} />
        )}
        {numAlt ? (
          <FaSortNumericDownAlt onClick={handleNumSort} />
        ) : (
          <FaSortNumericDown onClick={handleNumSort} />
        )}
      </div>
    </_Search>
  );
}

const _Search = styled.div`
  display: grid;

  grid-template:
    "search buttons_top" auto
    "search buttons_bottom" auto
    / 75% auto;

  .search {
    grid-area: search;
    position: relative;

    @media screen and (max-width: 992px) {
    }

    @media screen and (max-width: 600px) {
    }

    .overlay {
      width: 17.5%;
      height: calc(2em - 8px);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 1px;
      cursor: default;
      pointer-events: none;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.8) 30%,
        rgba(255, 255, 255, 0.9) 70%,
        rgba(255, 255, 255, 1) 100%
      );
      box-sizing: border-box;
    }

    .add {
      display: ${({ hide }) => hide && "none"};
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }

  .buttons_top {
    grid-area: buttons_top;
    place-self: center;
    > :not(:last-child) {
      margin-right: 8px;
    }
    > * {
      cursor: pointer;
    }
  }

  .buttons_bottom {
    grid-area: buttons_bottom;
    place-self: center;
    > :not(:last-child) {
      margin-right: 8px;
    }
    > * {
      cursor: pointer;
    }
  }
`;

export default Search;
