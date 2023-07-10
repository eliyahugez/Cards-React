import { Box, Button, Paper, Typography } from "@mui/material";
import useCounter from "./useCounter";

const CustomCounterHook = () => {
  const [counter, inc, dec, reset] = useCounter(10);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: 500, mt: 2 }}>
        <Typography align="center"> Count: {counter} </Typography>
        <Box>
            <Button onClick={inc} variant="outlined" sx={{m:2}}>Increment</Button>
            <Button onClick={dec} variant="outlined" sx={{m:2}}>Decrement</Button>
            <Button onClick={reset} variant="outlined" sx={{m:2}}>Reset</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CustomCounterHook;
