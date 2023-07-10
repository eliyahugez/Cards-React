import { useEffect, useState } from "react";
import { getTime } from "./utils";
import { Box, Button, Container } from "@mui/material";

const UseEffectAsComponentDidUpdate = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  
  useEffect(() => {
    console.log("in useEffect: ", getTime());
  }, [num]);

  return (
    <>
      <Container>
        {console.log("in render: ", getTime())}
        <Box>Count: {count}</Box>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCount((prev) => prev + 1)}
          >
            +
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCount((prev) => prev - 1)}
          >
            -
          </Button>
        </div>
      </Container>
      <Container>
        <Box>Num: {num}</Box>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setNum((prev) => prev + 1)}
          >
            +
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setNum((prev) => prev - 1)}
          >
            -
          </Button>
        </div>
      </Container>
    </>
  );
};

export default UseEffectAsComponentDidUpdate;
