import { useState, useEffect } from "react";
import { encrypt, decrypt } from "../utils";
import Fuse from "fuse.js";

const password = "feminizm";
const address = "localhost:3000";
const prefix = "/?d=";
const basic = {
  slogans: [],
};

function useData() {
  let [link, setLink] = useState();
  let [data, setData] = useState();
  let [fuse, setFuse] = useState();

  useEffect(() => {
    if (data) {
      const dataHash = encrypt(data, password);
      setLink(address + prefix + dataHash);
      setFuse(
        () =>
          new Fuse(data.slogans, {
            isCaseSensitive: false,
            findAllMatches: true,
          })
      );
    }
  }, [data]);

  useEffect(() => {
    fuse && console.log(fuse.search("go").map((val) => val));
  }, [fuse]);

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

  return { link, fuse, value: data, updateData, provideDataHash, addSlogan };
}
export default useData;
