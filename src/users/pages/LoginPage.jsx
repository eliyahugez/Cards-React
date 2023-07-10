import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import useUsers from "../hooks/useUsers";
import useForm from "../../forms/hooks/useForm";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/joi-schema/loginSchema";
import { Container } from "@mui/system";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";

const LoginPage = () => {
  const { user } = useUser();
  const { handleLogin } = useUsers();

  const { value, ...rest } = useForm(
    initialLoginForm,
    loginSchema,
    handleLogin
  );

  if (user) return <Navigate replace to={ROUTES.CARDS} />;



  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Form
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onChange={rest.validateForm}
        title="Login"
        styles={{ maxWidth: "450px" }}
        to={ROUTES.CARDS}
      >
        <Input
          label="email"
          name="email"
          type="email"
          data={value.formData}
          error={value.errors.email}
          handleChange={rest.handleChange}
        />
        <Input
          label="password"
          name="password"
          type="password"
          error={value.errors.password}
          handleChange={rest.handleChange}
          data={value.formData}
        />
      </Form>
    </Container>
  )
};

export default LoginPage;
