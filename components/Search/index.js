import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import { GoPlus } from "react-icons/go";
import { FiPrinter } from "react-icons/fi";
import usePDF from "customHooks/PDF";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function Search({ search, data, disabled, checked, toggleAll }) {
  const [value, setValue] = useState(""),
    hide =
      search.query.join(" ").length < 1 ||
      data.value.slogans.includes(search.query.join(" ")),
    handleChangeValue = (e) => {
      setValue(e.target.value);
      search.setQuery(e.target.value.toUpperCase().split(" "));
    },
    handleAdd = (e) => {
      if (hide || (e.key && e.key !== "Enter")) return;
      data.addSlogan(search.query.join(" "));
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
        <GoPlus className="add" onClick={handleAdd} />
      </div>
      <div className="toggle_print">
        {checked.length ? (
          <MdCheckBox onClick={toggleAll} />
        ) : (
          <MdCheckBoxOutlineBlank onClick={toggleAll} />
        )}
        <FiPrinter onClick={handlePrint} />
      </div>
    </_Search>
  );
}

const _Search = styled.div`
  position: relative;
  .add {
    position: absolute;
    right: 0;
    top: 0.5em;
    display: ${({ hide }) => hide && "none"};
  }
  .toggle_print {
    position: absolute;
    right: 0;
    top: 0.5em;
    > :first-child {
      margin-right: 8px;
    }
    > * {
      cursor: pointer;
    }
  }
  .search {
    position: relative;
    width: 90%;

    @media screen and (max-width: 992px) {
      width: 85%;
    }

    @media screen and (max-width: 600px) {
      width: 80%;
    }
  }
`;

export default Search;
