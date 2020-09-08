import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import { GoPlus } from "react-icons/go";
import { FiFilter } from "react-icons/fi";

function Search({ search, data }) {
  const [value, setValue] = useState("");

  function handleChangeValue(e) {
    setValue(e.target.value);
    search.handleChangeValue(e.target.value.toUpperCase().split(" "));
  }
  return (
    <_Search
      hide={
        search.query.join(" ").length < 1 ||
        data.value.slogans.includes(search.query.join(" "))
      }
    >
      <div className="search">
        <Input
          placeholder="Search/Add"
          value={value}
          onChange={handleChangeValue}
        />
        <GoPlus
          className="add"
          onClick={() => data.addSlogan(search.query.join(" "))}
        />
      </div>
      <FiFilter className="filter" />
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
  .filter {
    position: absolute;
    right: 0;
    top: 0.5em;
  }
  .search {
    position: relative;
    width: 90%;
  }
`;

export default Search;
