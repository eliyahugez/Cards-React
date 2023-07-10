import { Grid, TextField } from "@mui/material";
import { makeFirstLetterCapital } from "../utils/algoMethods";
import { bool, func, object, string } from "prop-types";
import { memo } from "react";

const Input = ({
  variant,
  type,
  name,
  data,
  label,
  required,
  error,
  handleChange,
  ...rest
}) => {
  return (
    <Grid item xs={12} {...rest}>
      <TextField
        variant={variant}
        label={makeFirstLetterCapital(label)}
        type={type}
        name={name}
        value={data[name] || ""}
        required={required}
        helperText={error}
        error={Boolean(error)}
        onChange={handleChange}

        fullWidth
        autoComplete="off"
      />
    </Grid>
  );
};

Input.propTypes = {
  variant: string,
  type: string,
  name: string.isRequired,
  data: object.isRequired,
  required: bool,
  error: string,
  handleChange: func.isRequired,
}

Input.defaultProps = {
  variant: "outlined",
  type: "text",
  required: true
};

export default memo(Input);
