import React from "react";
import { func, node } from "prop-types";
import { colorLog } from "../utils";

const ButtonComp = ({ onClick, children }) => {
  colorLog(`rendering button ${children}`, "#2d65ff");
  return (
    <button style={{ padding: 3 }} onClick={onClick}>
      {children}
    </button>
  );
};

ButtonComp.propTypes = {
  onClick: func.isRequired,
  children: node.isRequired,
};

export default ButtonComp;
// export default React.memo(ButtonComp);
