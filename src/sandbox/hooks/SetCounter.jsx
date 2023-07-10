import { useState } from "react";

export const SetCounter = () => {
  const [counter, setCounter] = useState(0);

  const changeNum = (term = "") => {
    switch (term) {
      case "increment":
        return setCounter((prev) => prev + 1);
      case "decrement":
        return setCounter((prev) => prev - 1);
    }
    setCounter(0);
  };

  return (
    <div>
      <p>{counter}</p>
      <button
        style={{ p: 2, mx: 1 }}
        onClick={() => changeNum("increment")}
      >
        +
      </button>
      <button
        style={{ p: 2, mx: 1 }}
        onClick={() => changeNum("decrement")}
      >
        -
      </button>
      {/* <button
        style={{ p: 2, mx: 1 }}
        onClick={() => setCounter((prev) => prev * 2)}
      >
        multiple
      </button> */}
      <button style={{ p: 2, mx: 1 }} onClick={changeNum}>
        reset
      </button>
    </div>
  );
};
