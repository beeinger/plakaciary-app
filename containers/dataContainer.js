import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import { encrypt, decrypt } from "../utils";

const password = "feminizm";
const address = "localhost:3000";
const prefix = "/?d=";
const example = {
  slogans: ["Przemo zabija"],
};

function useData() {
  let [link, setLink] = useState(false);
  let [data, setData] = useState(false);

  useEffect(() => {
    if (data) {
      const dataHash = encrypt(data, password);
      setLink(address + prefix + dataHash);
    }
  }, [data]);

  let provideDataHash = (dataHash) => {
    if (typeof dataHash === "string") {
      const decrypted = decrypt(dataHash, password);
      setData(decrypted);
    }
  };

  let updateData = (newData = example) =>
    setData(data ? { ...data, ...newData } : newData);

  return { link, value: data, updateData, provideDataHash };
}

let DataContainer = createContainer(useData);
export default DataContainer;
