import { Navigate, useNavigate } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import useUsers from "../hooks/useUsers";
import { useUser } from "../providers/UserProvider";
// import signupSchema from "../models/joi-schema/signupSchema";
import { useEffect } from "react";
import mapUserToModel from "../helpers/normalization/mapUserToModel";
import ROUTES from "../../routes/routesModel";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { Checkbox, Container, FormControlLabel, Grid } from "@mui/material";
// import Form from "../../forms/components/Form";
// import Input from "../../forms/components/Input";
import editUserSchema from "../models/joi-schema/editUserSchema";
import FormInput from "../../forms/components/FormInputs";


const EditUserPage = () => {
    const { handleEditUser, handleGetUser } = useUsers();
    const { user } = useUser();


    const navigate = useNavigate();

    const { value, ...rest } = useForm(initialSignupForm, editUserSchema, () => {
        handleEditUser(user._id, {
            ...normalizeUser(value.formData),
            isAdmin: user.isAdmin,
        });
    });
    useEffect(() => {
        handleGetUser(user._id).then((data) => {
            if (data._id !== user._id) return navigate(ROUTES.CARDS);
            const modelUser = mapUserToModel(data);

            rest.setFormData(modelUser);
        });
    }, []);

    if (!user) return <Navigate replace to={ROUTES.CARDS} />;

    const inputFactory = (name, label, required, type) => ({
        name,
        label,
        required,
        type,
    });

    const mapInputs = [
        inputFactory("first", "first name", true, "text"),
        inputFactory("middle", "middle name", false, "text"),
        inputFactory("last", "last name", true, "text"),
        inputFactory("phone", "phone", true, "phone"),
        inputFactory("email", "email", true, "email"),
        inputFactory("url", "image url", false, "text"),
        inputFactory("imageAlt", "image alt", false, "text"),
        inputFactory("state", "state", false, "text"),
        inputFactory("country", "country", true, "text"),
        inputFactory("city", "city", true, "text"),
        inputFactory("street", "street", true, "text"),
        inputFactory("houseNumber", "houseNumber", true, "number"),
        inputFactory("zip", "zip", false, "number"),
    ];

    return (
        <Container
            sx={{
                paddingTop: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <FormInput
                onSubmit={rest.onSubmit}
                onReset={rest.handleReset}
                onFormChange={rest.validateForm}
                errors={value.errors}
                onInputChange={rest.handleChange}
                data={value.formData}
                title="Edit User"
                inputs={mapInputs}

            >

                <Grid item>
                    <FormControlLabel
                        onChange={(e) =>
                            rest.setFormData({
                                ...value.formData,
                                isBusiness: e.target.checked,
                            })
                        }
                        name="isBusiness"
                        control={
                            <Checkbox checked={value.formData.isBusiness} color="primary" />
                        }
                        label="Signup as Business"
                    ></FormControlLabel>
                </Grid>
            </FormInput>
        </Container>
    );

    // return (
    //   <Container
    //     sx={{
    //       paddingTop: 8,
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Form
    //       onSubmit={rest.onSubmit}
    //       onChange={rest.validateForm}
    //       onReset={rest.handleReset}
    //       styles={{ maxWidth: "800px" }}
    //       title="register"
    //       to={ROUTES.CARDS}
    //     >
    //       <Input
    //         name="first"
    //         label="first name"
    //         error={value.errors.first}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //       />
    //       <Input
    //         name="middle"
    //         label="middle name"
    //         error={value.errors.middle}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //         required={false}
    //       />
    //       <Input
    //         name="last"
    //         label="last name"
    //         error={value.errors.last}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //       />
    //       <Input
    //         name="phone"
    //         label="phone"
    //         type="phone"
    //         error={value.errors.phone}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //       />
    //       <Input
    //         name="email"
    //         label="email"
    //         type="email"
    //         error={value.errors.email}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //       />
    //       {/* <Input
    //         name="password"
    //         label="password"
    //         type="password"
    //         error={value.errors.password}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //       /> */}
    //       <Input
    //         name="url"
    //         label="image url"
    //         error={value.errors.url}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //         required={false}
    //       />
    //       <Input
    //         name="alt"
    //         label="image alt"
    //         error={value.errors.alt}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //         required={false}
    //       />
    //       <Input
    //         name="state"
    //         label="state"
    //         error={value.errors.state}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //         required={false}
    //       />
    //       <Input
    //         label="country"
    //         name="country"
    //         error={value.errors.country}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //       />
    //       <Input
    //         name="city"
    //         label="city"
    //         error={value.errors.city}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //       />
    //       <Input
    //         name="street"
    //         label="street"
    //         error={value.errors.street}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //       />
    //       <Input
    //         name="houseNumber"
    //         label="house Number"
    //         type="number"
    //         error={value.errors.houseNumber}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //       />
    //       <Input
    //         name="zip"
    //         label="zip"
    //         error={value.errors.zip}
    //         handleChange={rest.handleChange}
    //         data={value.formData}
    //         sm={6}
    //         required={false}
    //       />

    //       <Grid item>
    //         <FormControlLabel
    //           onChange={(e) =>
    //             rest.setFormData({
    //               ...value.formData,
    //               isBusiness: e.target.checked,
    //             })
    //           }
    //           name="isBusiness"
    //           control={
    //             <Checkbox checked={value.formData.isBusiness} color="primary" />
    //           }
    //           label="Signup as Business"
    //         ></FormControlLabel>
    //       </Grid>
    //     </Form>
    //   </Container>
    // );
};

export default EditUserPage;