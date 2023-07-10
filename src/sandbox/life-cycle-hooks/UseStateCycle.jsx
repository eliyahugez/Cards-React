import { useState } from "react";
import { colorLog } from "./utils";

const UseStateCycle = () => {
  const [count, setCount] = useState(() => {
    colorLog("In useState", "yellow");

    setTimeout(() => {
      setCount(prev => prev + 1);
    }, 5000);

    return 0;
  });

  return (
    <div>
      <div>Count: {count}</div>
      {colorLog("In component return", "red")}
    </div>
  );
};

export default UseStateCycle;
