import React from "react";
import ChildPropTypeError from "./ChildPropTypeError";

const FatherPropTypeError = () => {
  return <ChildPropTypeError text="correct!!!" />;
};

export default FatherPropTypeError;
