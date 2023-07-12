import { Container, Fab } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useEffect } from "react";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";
import { Navigate, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";

const CardsPage = () => {
  const { value, handleGetCards, handleDeleteCard } = useCards();
  const { cards, error, isPending, filteredCards } = value;
  const navigate = useNavigate();
  const { user } = useUser();
  useEffect(() => {
    handleGetCards();
  }, []);

  const onDeleteCard = async (cardId) => {
    await handleDeleteCard(cardId);
    await handleGetCards();
  };

  return (
    <>
      <Container>
        <PageHeader
          title="Cards"
          subtitle="Here you can find business cards from all categories"
        />

        <CardsFeedback
          isPending={isPending}
          error={error}
          cards={filteredCards}
          onDelete={onDeleteCard}
        />
        {user && (user.isAdmin === true || user.isBusiness === true) && (
          <Fab
            onClick={() => navigate(ROUTES.CREATE_CARD)}
            color="primary"
            aria-label="add"
            tooltipTitle={"Add Card"}
            sx={{
              position: "absolute",
              bottom: 75,
              right: 16,
            }}
          >
            <AddIcon />
          </Fab>
        )}
        {user && (!user.isBusiness || !user.isAdmin) || !user && (
          <Fab
            onClick={() => navigate(ROUTES.SIGNUP)}
            color="primary"
            aria-label="add"
            tooltipTitle={"Add Card"}
            sx={{
              position: "absolute",
              bottom: 75,
              right: 16,
            }}
          >
            <AddIcon />
          </Fab>
        )}
      </Container>

    </>
  );
};

export default CardsPage;
