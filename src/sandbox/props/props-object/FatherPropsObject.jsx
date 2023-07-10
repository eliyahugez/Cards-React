import { Box, Typography } from "@mui/material";
import React from "react";
import ChildPropsObject from "./ChildPropsObject";

const FatherPropsObject = () => {
  const nameObj = { first: "shola", last: "zaken" };

  return (
    <>
      <Typography m={2}>Father Prop object</Typography>
      <Box
        sx={{
          m: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 300,
          height: 300,
          backgroundColor: "secondary.dark",
        }}
      >
        <ChildPropsObject name={nameObj} />
      </Box>
    </>
  );
};

export default FatherPropsObject;
