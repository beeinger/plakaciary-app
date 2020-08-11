import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Slogans({ data }) {
  const router = useRouter();
  const { d } = router.query;

  useEffect(() => {
    data.provideDataHash(d);
  }, []);

  if (!data.value) {
    return (
      <div>
        Please provide url containing data
        <button
          onClick={() => {
            data.updateData({ example: true });
          }}
        >
          setData
        </button>
      </div>
    );
  }

  return <div>{JSON.stringify(data.value)}</div>;
}
