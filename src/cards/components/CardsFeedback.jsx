import { arrayOf, bool, func, object, oneOfType, string } from "prop-types"
import Spinner from "../../components/Spinner"
import Cards from "./Cards"
import cardType from "../models/types/cardType"
import Error from "../../components/Error"

const CardsFeedback = ({ isPending, error, cards, onDelete ,onLike }) => {
    if (isPending) return <Spinner />
    if (error) return <Error errorMessage={error} />
    if (cards && !cards.length) {
        return (
            <p>
                OOpsi... there are no cards in the database that match the parameters you entered
            </p>
        )
    }
    if (cards) return <Cards cards={cards} onDelete={onDelete} onLike={onLike} />
}

CardsFeedback.propTypes = {
    isPending: bool.isRequired,
    error: string,
    cards: arrayOf(cardType),
    onDelete: func.isRequired,

}

CardsFeedback.defaultProps = {
    onLike: () => {},
  };

export default CardsFeedback;