import React, { useContext, useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import { GoPlus } from "react-icons/go";
import { FiPrinter, FiTrash2 } from "react-icons/fi";
import { usePDF } from "utils";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import GlobalContext from "context";

function Search({ disabled }) {
  const [value, setValue] = useState(""),
    {
      query,
      data,
      addSlogan,
      setQuery,
      checked,
      toggleAll,
      deleteChecked,
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
      <div className="toggle_print">
        {checked.length ? (
          <MdCheckBox onClick={toggleAll} />
        ) : (
          <MdCheckBoxOutlineBlank onClick={toggleAll} />
        )}
        <FiPrinter onClick={handlePrint} />
        <FiTrash2 onClick={deleteChecked} />
      </div>
    </_Search>
  );
}

const _Search = styled.div`
  display: grid;

  grid-template:
    "search buttons" auto
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

  .toggle_print {
    grid-area: buttons;
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
