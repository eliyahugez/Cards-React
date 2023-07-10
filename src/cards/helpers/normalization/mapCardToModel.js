const mapCardToModel = (card) => {
    return {
        title: card.title,
        description: card.description,
        subtitle: card.subtitle,
        phone: card.phone,
        email: card.email,
        webUrl: card.web,
        imageUrl: card.image.url,
        imageAlt: card.image.alt,
        state: card.address.state,
        country: card.address.country,
        city: card.address.city,
        street: card.address.street,
        zip: card.address.zip,
        houseNumber: card.address.houseNumber
    }
};

export default mapCardToModel;