import React from "react";
import ChildAnyAndDefaultProps from "./ChildAnyAndDefaultProps";

const FatherAnyAndDefaultProps = () => {
  return <ChildAnyAndDefaultProps age={3} />;
};

export default FatherAnyAndDefaultProps;
