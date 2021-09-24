import { decrypt, encrypt } from "../utils";
import { useEffect, useState } from "react";

import Fuse from "fuse.js";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const address = "https://app.plakaciary.pl/";
const prefix = "?d=";
const basic = {
  slogans: [],
};

export default function useData() {
  const [password, setPassword] = useState(),
    [link, setLink] = useState(),
    [data, setData] = useState(),
    [dataHash, setDataHash] = useState(),
    [fuse, setFuse] = useState(),
    [checked, setChecked] = useState([]),
    router = useRouter();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataHash, password]);

  const provideDataHash = (dataHash) => {
      if (typeof dataHash === "string") setDataHash(dataHash);
    },
    updateData = (newData = basic) => {
      setData(data ? { ...data, ...newData } : newData);
    },
    addSlogan = (newSlogan) => {
      setData({ ...data, ...{ slogans: [...data.slogans, ...[newSlogan]] } });
    },
    toggleChecked = (id) => {
      var _checked = [...checked];
      if (checked.includes(id)) {
        const index = _checked.indexOf(id);
        if (index > -1) _checked.splice(index, 1);
        setChecked(_checked);
      } else {
        _checked.push(id);
        setChecked(_checked);
      }
    },
    toggleAll = () => {
      if (checked.length) setChecked([]);
      else setChecked(data.slogans);
    },
    deleteChecked = () => {
      updateData({
        slogans: data.slogans.filter((slogan) => !checked.includes(slogan)),
      });
      setChecked([]);
    },
    deleteSlogan = (slogan) => {
      updateData({
        slogans: data.slogans.filter((dataSlogan) => dataSlogan !== slogan),
      });
    };

  return {
    setPassword,
    password,
    provideDataHash,
    data,
    updateData,
    checked,
    toggleChecked,
    toggleAll,
    addSlogan,
    deleteChecked,
    deleteSlogan,
    fuse,
    link,
  };
}
