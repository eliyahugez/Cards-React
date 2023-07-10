const normalizeCard = card => {
    return {
        title: card.title,
        description: card.description,
        subtitle: card.subtitle,
        phone: card.phone,
        email: card.email,
        web: card.webUrl,
        image: {
            url: card.imageUrl,
            alt: card.imageAlt,
        },
        address: {
            state: card.state,
            country: card.country,
            city: card.city,
            street: card.street,
            zip: card.zip,
            houseNumber: card.houseNumber,
        },
    }
};

export default normalizeCard;