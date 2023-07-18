import React from "react";
import ChildExactVsRequired from "./ChildExactVsRequired";

const FatherExactVsRequired = () => {
  const obj = { key: "hallo", secondKey: 5 };
  return (
    <>
      <ChildExactVsRequired />
      <ChildExactVsRequired obj={obj} />
    </>
  );
};

export default FatherExactVsRequired;
