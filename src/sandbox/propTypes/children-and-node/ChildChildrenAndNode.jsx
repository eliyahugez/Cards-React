import React from "react";
import { node, element, arrayOf } from "prop-types";

const ChildChildrenAndNode = ({ children }) => {
  return <div>{children}</div>;
};

ChildChildrenAndNode.propTypes = {
  children: arrayOf(element).isRequired,
};

export default ChildChildrenAndNode;
