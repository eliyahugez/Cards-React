import Joi from "joi";
import useForm from "../../forms/hooks/useForm";
import { Container } from "@mui/material";
import Form from "../../forms/components/Form";
import ROUTES from "../../routes/routesModel";
import Input from "../../forms/components/Input";

const FormTest = () => {
    const INITIAL_FORM = {
        first: "",
        last: "",
    };

    const schema = {
        first: Joi.string().min(2).required(),
        last: Joi.string().min(2).required(),
    };

    const handleSubmit = (data) => console.log(data);

    const { value, ...rest } = useForm(INITIAL_FORM, schema, handleSubmit);

    return (
        <Container
            sx={{
                mt: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Form
                title="Test form"
                onSubmit={rest.onSubmit}
                onReset={rest.handleReset}
                styles={{ maxWidth: "450px" }}
                onChange={rest.validateForm}
                to={ROUTES.SANDBOX}
            >
                <Input
                    label="First name"
                    name="first"
                    data={value.formData}
                    error={value.errors.first}
                    handleChange={rest.handleChange}
                >
                </Input>
                <Input
                    label="Last name"
                    name="last"
                    data={value.formData}
                    error={value.errors.last}
                    handleChange={rest.handleChange}
                >
                </Input>
            </Form>
        </Container>
    );
};

export default FormTest;