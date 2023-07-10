import { Container, Fab } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useEffect } from "react";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";
import { Navigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ROUTES from "../../routes/routesModel";

const CardsPage = () => {
  const { value, handleGetCards, handleDeleteCard } = useCards();
  const { cards, error, isPending, filteredCards } = value;

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

      </Container>

    </>
  );
};

export default CardsPage;
