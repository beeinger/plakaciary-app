import {
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortNumericDown,
  FaSortNumericDownAlt,
} from "react-icons/fa";
import { FiPrinter, FiTrash2 } from "react-icons/fi";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import React, { useContext, useState } from "react";

import GlobalContext from "context";
import { GoPlus } from "react-icons/go";
import Input from "./Input";
import styled from "styled-components";
import { usePdf } from "utils";

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
    print = usePdf(),
    handlePrint = () => !disabled && checked.length && print(checked);

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
      <div className="buttons_bottom">
        {alphAlt ? (
          <FaSortAlphaDownAlt size={"1.25em"} onClick={handleAlphSort} />
        ) : (
          <FaSortAlphaDown size={"1.25em"} onClick={handleAlphSort} />
        )}
        {numAlt ? (
          <FaSortNumericDownAlt size={"1.25em"} onClick={handleNumSort} />
        ) : (
          <FaSortNumericDown size={"1.25em"} onClick={handleNumSort} />
        )}
      </div>
      <div className="buttons_top">
        <FiTrash2 size={"1.25em"} onClick={deleteChecked} />
        {checked.length ? (
          <MdCheckBox size={"1.25em"} onClick={toggleAll} />
        ) : (
          <MdCheckBoxOutlineBlank size={"1.25em"} onClick={toggleAll} />
        )}
        <FiPrinter size={"1.25em"} onClick={handlePrint} />
      </div>
    </_Search>
  );
}

const _Search = styled.div`
  display: grid;

  grid-template:
    "search buttons_top" auto
    "search buttons_bottom" auto
    / auto 25%;

  row-gap: 8px;

  @media screen and (max-width: 992px) {
    grid-template:
      "search buttons_top" auto
      "search buttons_bottom" auto
      / auto 30%;
  }

  @media screen and (max-width: 600px) {
    grid-template:
      "search buttons_top" auto
      "search buttons_bottom" auto
      / auto 42.5%;
  }

  .search {
    grid-area: search;
    position: relative;

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
    height: 20px;
    place-self: center;
    margin-left: 8px;
    > :not(:last-child) {
      margin-right: 16px;
    }
    > * {
      cursor: pointer;
    }
  }

  .buttons_bottom {
    grid-area: buttons_bottom;
    height: 20px;
    place-self: center;
    margin-left: 8px;
    > :not(:last-child) {
      margin-right: 16px;
    }
    > * {
      cursor: pointer;
    }
  }
`;

export default Search;
