const Card = require("./mongodb/Card");
const { handleBadRequest } = require("../../utils/handleErrors");

const DB = process.env.DB || "MONGODB";

const getCards = async () => {
  if (DB === "MONGODB") {
    try {
      const cards = await Card.find();
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get cards not in mongodb");
};

const getMyCards = async userId => {
  if (DB === "MONGODB") {
    try {
      const cards = await Card.find({ user_id: userId });
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get card not in mongodb");
};

const getCard = async cardId => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findById(cardId);
      if (!card) throw new Error("Could not find this card in the database");

      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get card not in mongodb");
};

const createCard = async normalizedCard => {
  if (DB === "MONGODB") {
    try {
      let card = new Card(normalizedCard);
      card = await card.save();
      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("createCard card not in mongodb");
};

const updateCard = async (cardId, normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findByIdAndUpdate(cardId, normalizedCard, {
        new: true,
      });

      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card updateCard not in mongodb");
};

const changeBizNumber = async (cardId, bizNumber) => {
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { bizNumber },
      { new: true }
    );

    if (!card)
      throw new Error("A card with this ID cannot be found in the database");

    return Promise.resolve(card);
  } catch (error) {
    return handleBadRequest("Mongoose", error);
  }
};

const likeCard = async (cardId, userId) => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findById(cardId);
      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      const cardLikes = card.likes.find(id => id === userId);

      if (!cardLikes) {
        card.likes.push(userId);
        const cardFromDB = await card.save();
        return Promise.resolve(cardFromDB);
      }

      const cardFiltered = card.likes.filter(id => id !== userId);
      card.likes = cardFiltered;
      const cardFromDB = await card.save();
      return Promise.resolve(cardFromDB);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card likeCard not in mongodb");
};

const deleteCard = async (cardId, user) => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findById(cardId);

      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      if (!user.isAdmin && card.user_id != user._id)
        throw new Error(
          "Authorization Error: Only the user who created the business card or admin can delete this card"
        );

      const cardFromDB = await Card.findByIdAndDelete(cardId);
      return Promise.resolve(cardFromDB);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};

exports.getCards = getCards;
exports.getMyCards = getMyCards;
exports.getCard = getCard;
exports.createCard = createCard;
exports.updateCard = updateCard;
exports.changeBizNumber = changeBizNumber;
exports.likeCard = likeCard;
exports.deleteCard = deleteCard;
