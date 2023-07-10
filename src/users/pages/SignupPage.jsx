import { Checkbox, Container, FormControlLabel, Grid } from "@mui/material";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useUsers from "../hooks/useUsers";
import useForm from "../../forms/hooks/useForm";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import signupSchema from "../models/joi-schema/signupSchema";
import { useUser } from "../providers/UserProvider";
import Input from "../../forms/components/Input";
import Form from "../../forms/components/Form";
import { CheckBox } from "@mui/icons-material";

const SignupPage = () => {
  const { handleSignup } = useUsers();
  const { value, ...rest } = useForm(
    initialSignupForm,
    signupSchema,
    handleSignup
  );

  const { user } = useUser();

  if (user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        onSubmit={rest.onSubmit}
        onChange={rest.validateForm}
        onReset={rest.handleReset}
        styles={{ maxWidth: "800px" }}
        title="register"
        to={ROUTES.CARDS}
      >
        <Input
          name="first"
          label="first name"
          error={value.errors.first}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
        />
        <Input
          name="middle"
          label="middle name"
          error={value.errors.middle}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
          required={false}
        />
        <Input
          name="last"
          label="last name"
          error={value.errors.last}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
        />
        <Input
          name="phone"
          label="phone"
          type="phone"
          error={value.errors.phone}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
        />
        <Input
          name="email"
          label="email"
          type="email"
          error={value.errors.email}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
        />
        <Input
          name="password"
          label="password"
          type="password"
          error={value.errors.password}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
        />
        <Input
          name="url"
          label="image url"
          error={value.errors.url}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
          required={false}
        />
        <Input
          name="alt"
          label="image alt"
          error={value.errors.alt}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
          required={false}
        />
        <Input
          name="state"
          label="state"
          error={value.errors.state}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
          required={false}
        />
        <Input
          label="country"
          name="country"
          error={value.errors.country}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
        />
        <Input
          name="city"
          label="city"
          error={value.errors.city}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
        />
        <Input
          name="street"
          label="street"
          error={value.errors.street}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
        />
        <Input
          name="houseNumber"
          label="house Number"
          type="number"
          error={value.errors.houseNumber}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
        />
        <Input
          name="zip"
          label="zip"
          error={value.errors.zip}
          onChange={rest.handleChange}
          data={value.formData}
          sm={6}
          required={false}
        />

        <Grid item>
          <FormControlLabel
            onChange={(e) => rest.setFormData({
              ...value.formData,
              isBusiness: !!e.target.checked
            })}
            name="isBusiness"
            control={<Checkbox value={value.formData.isBusiness} color="primary" />}
            label="Signup as Business"
          >
          </FormControlLabel>
        </Grid>
      </Form>
    </Container>
  );
};

export default SignupPage;
