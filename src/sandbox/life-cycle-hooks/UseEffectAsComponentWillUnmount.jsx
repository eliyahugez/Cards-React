import { useEffect } from "react";
import { getTime } from "./utils";
import { Box, Button, Container } from "@mui/material";

const UseEffectAsComponentWillUnmount = () => {
  useEffect(() => {
    console.log(`in useEffect: ${getTime()}`);
    return () => console.log(`in render - use effect will unmount: ${getTime()}`);
  }, []);

  return <div>{console.log(`in useEffect render: ${getTime()}`)}</div>
};

export default UseEffectAsComponentWillUnmount;
