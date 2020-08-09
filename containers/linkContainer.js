import { useState } from "react";
import { createContainer } from "unstated-next";

function useLink(initialState = "aaa") {
  let [link, setLink] = useState(initialState);

  let update = (newLink) => {
    // TODO update link
    setLink(newLink);
  };

  return { value: link, update };
}

let LinkContainer = createContainer(useLink);
export default LinkContainer;
