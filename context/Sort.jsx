import { getCharactersCount } from "utils";
import { useState } from "react";

export default function useSort() {
  const [sortOrder, setSortOrder] = useState("numDescending");

  function sort(slogans) {
    const allLettersString = slogans.join("").split(" ").join("");
    var letters = getCharactersCount(allLettersString);
    switch (sortOrder) {
      case "numDescending":
        letters
          .sort((a, b) => (a[0] > b[0] ? 1 : b[0] > a[0] ? -1 : 0))
          .sort((a, b) => (a[1] - b[1]) * -1);
        break;
      case "numAscending":
        letters
          .sort((a, b) => (a[0] > b[0] ? 1 : b[0] > a[0] ? -1 : 0))
          .sort((a, b) => a[1] - b[1]);
        break;
      case "alphDescending":
        letters.sort((a, b) => (a[0] > b[0] ? -1 : b[0] > a[0] ? 1 : 0));
        break;
      case "alphAscending":
        letters.sort((a, b) => (a[0] > b[0] ? 1 : b[0] > a[0] ? -1 : 0));
        break;
    }
    return letters;
  }

  return {
    sortOrder,
    setSortOrder,
    sort,
  };
}
