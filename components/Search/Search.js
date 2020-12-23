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
    > :not(:last-child) {
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
