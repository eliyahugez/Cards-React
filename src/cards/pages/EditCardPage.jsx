import { Navigate, useNavigate, useParams } from "react-router-dom";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import cardSchema from "../models/joi-schema/cardSchema";
import normalizeCard from "../helpers/normalization/normalizeCard";
import { useEffect } from "react";
import ROUTES from "../../routes/routesModel";
import mapCardToModel from "../helpers/normalization/mapCardToModel";
import { Container } from "@mui/material";
import CardForm from "../components/CardForm";
import { useSnackbar } from "../../providers/SnackbarProvider";


const EditCardPage = () => {

    const { id } = useParams();
    const {
        handleUpdateCard,
        handleGetCard,
        value: { card },
    } = useCards();
    const { user } = useUser();
    const navigate = useNavigate();
    const snack = useSnackbar();

    const { value, ...rest } = useForm(
        initialCardForm,
        cardSchema,
        () => {

            handleUpdateCard(card._id, {
                ...normalizeCard(value.formData),
                user_id: card.user_id,
                bizNumber: card.bizNumber

            });
        }
    )

    useEffect(() => {
        handleGetCard(id).then(data => {
            if (user.isAdmin === true) {
                const modeledCard = mapCardToModel(data);
                rest.setFormData(modeledCard);
            }
            else if (data.user_id !== user._id) return navigate(ROUTES.CARDS), snack("This is NOT your Card", "warning"), console.log(user);


            const modeledCard = mapCardToModel(data);
            rest.setFormData(modeledCard);
        })
    }, []);

    if (!user) return <Navigate replace to={ROUTES.CARDS} />
    const inputFactory = (name, label, required, type) => ({ name, label, required, type })
    const mapInputs = [
        inputFactory("title", "title", true, "text"),
        inputFactory("subtitle", "subtitle", true, "text"),
        inputFactory("description", "description", true, "text"),
        inputFactory("phone", "phone", true, "phone"),
        inputFactory("email", "email", true, "email"),
        inputFactory("webUrl", "web", false, "text"),
        inputFactory("imageUrl", "image url", false, "text"),
        inputFactory("imageAlt", "image alt", false, "text"),
        inputFactory("state", "state", false, "text"),
        inputFactory("country", "country", true, "text"),
        inputFactory("city", "city", true, "text"),
        inputFactory("street", "street", true, "text"),
        inputFactory("houseNumber", "houseNumber", true, "number"),
        inputFactory("zip", "zip", true, "number")
    ]
    return (
        <Container
            sx={{
                paddingTop: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <CardForm
                title="Edit Card"
                onSubmit={rest.onSubmit}
                onReset={rest.handleReset}
                errors={value.errors}
                onFormChange={rest.validateForm}
                onInputChange={rest.handleChange}
                data={value.formData}
                inputs={mapInputs}
            >
            </CardForm>
        </Container>
    )
}

export default EditCardPage;