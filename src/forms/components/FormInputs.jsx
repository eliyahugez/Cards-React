import { arrayOf, func, object, string } from "prop-types";
import Form from "./Form";
import Input from "./Input";
import ROUTES from "../../routes/routesModel";

const FormInput = ({
  onSubmit,
  onReset,
  errors,
  onFormChange,
  onInputChange,
  data,
  title,
  inputs,
  children,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      onChange={onFormChange}
      onReset={onReset}
      styles={{ maxWidth: "800px" }}
      title={title}
      to={ROUTES.CARDS}
    >
      {inputs.map((input, index) => (
        <Input
          key={index}
          {...input}
          data={data}
          error={errors[input.name]}
          handleChange={onInputChange}
          sm={6}
        />
      ))}
      {children}
    </Form>
  );
};

FormInput.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  errors: object,
  onFormChange: func.isRequired,
  onInputChange: func.isRequired,
  data: object.isRequired,
  title: string.isRequired,
  inputs: arrayOf(object).isRequired,
};

export default FormInput;