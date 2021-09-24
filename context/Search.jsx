import { useState } from "react";

export default function useSearch() {
  let [query, setQuery] = useState([]);

  return { query, setQuery };
}
