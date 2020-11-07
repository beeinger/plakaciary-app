import { useState, useEffect } from "react";
import { encrypt, decrypt } from "../utils";
import Fuse from "fuse.js";
import { useRouter } from "next/router";
import { execOnce } from "next/dist/next-server/lib/utils";
import { toast } from "react-toastify";

const password = "feminizm";
const address = "https://app.plakaciary.pl/";
const prefix = "?d=";
const basic = {
  slogans: [],
};

function useData() {
  let [password, setPassword] = useState();
  let [link, setLink] = useState();
  let [data, setData] = useState();
  let [dataHash, setDataHash] = useState();
  let [fuse, setFuse] = useState();

  const router = useRouter();

  useEffect(() => {
    if (data && password) {
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
  }, [data, password]);

  useEffect(() => {
    if (!password) {
      router.push("/login");
      return;
    }
    if (dataHash) {
      var decrypted;
      try {
        decrypted = decrypt(dataHash, password);
        router.push("/");
      } catch (e) {
        toast.error("Wrong password!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
      setData(decrypted);
    } else {
      router.push("/");
    }
  }, [dataHash, password]);

  let provideDataHash = (dataHash) => {
    if (typeof dataHash === "string") setDataHash(dataHash);
  };

  let updateData = (newData = basic) =>
    setData(data ? { ...data, ...newData } : newData);

  let addSlogan = (newSlogan) =>
    setData({ ...data, ...{ slogans: [...data.slogans, ...[newSlogan]] } });

  return {
    password,
    setPassword,
    link,
    fuse,
    value: data,
    updateData,
    provideDataHash,
    addSlogan,
  };
}
export default useData;
