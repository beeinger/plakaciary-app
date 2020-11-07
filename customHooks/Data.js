import { useState, useEffect } from "react";
import { encrypt, decrypt } from "../utils";

const password = "feminizm";
const address = "localhost:3000";
const prefix = "/?d=";
const basic = {
  slogans: [],
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

  let updateData = (newData = basic) =>
    setData(data ? { ...data, ...newData } : newData);

  let addSlogan = (newSlogan) =>
    setData({ ...data, ...{ slogans: [...data.slogans, ...[newSlogan]] } });

  return { link, value: data, updateData, provideDataHash, addSlogan };
}
export default useData;
