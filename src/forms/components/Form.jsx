import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormButton from "./FormButton";
import { func, node, number, object, string } from "prop-types";
import { memo } from "react";
import LoopIcon from "@mui/icons-material/Loop";

const Form = ({
  title,
  onSubmit,
  onReset,
  onChange,
  to,
  color,
  spacing,
  styles,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      component="form"
      color={color}
      sx={{ mt: 2, p: { xs: 1, sm: 2 }, ...styles }}
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate
    >
      <Typography align="center" variant="h5" component="h1" mb={2}>
        {title.toUpperCase()}
      </Typography>

      <Grid container spacing={spacing}>
        {children}
      </Grid>

      <Grid container spacing={1} my={2} direction="row" width="100">
        <Grid item xs={12} sm={6}>
          <FormButton
            node="cancel"
            color="error"
            component="div"
            variant="outlined"
            onClick={() => navigate(to)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormButton
            node={<LoopIcon />}
            variant="outlined"
            component="div"
            onClick={onReset}
          />
        </Grid>

        <Grid item xs={12}>
          <FormButton
            node="Submit"
            onClick={onSubmit}
            disabled={!!onChange()}
            size="large"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

Form.propTypes = {
  title: string,
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  onChange: func.isRequired,
  to: string,
  color: string,
  spacing: number,
  styles: object,
  children: node.isRequired,
};

Form.defaultProps = {
  color: "inherit",
  spacing: 1,
  styles: {},
  to: "/",
  title: "",
};

export default memo(Form);
