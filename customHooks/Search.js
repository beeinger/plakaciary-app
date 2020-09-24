import { useState, useEffect } from "react";

function useSearch() {
  let [query, setQuery] = useState([]);
  let [filters, setFilters] = useState([]);

  let handleChangeValue = (_query) => setQuery(_query);

  return { query, handleChangeValue };
}

export default useSearch;
