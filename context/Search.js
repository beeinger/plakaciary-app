import { useState } from "react";

function useSearch() {
  let [query, setQuery] = useState([]);

  return { query, setQuery };
}

export default useSearch;
