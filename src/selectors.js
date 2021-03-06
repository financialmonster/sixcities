const hasOffers = ({offers, isError}) => !!offers.length && !isError;

const citiesNames = ({offers}) => Array.from(new Set(offers.map((item) => item.city.name))).sort().slice(0, 6);

const hotelsByCity = ({offers, activeCity}) => offers.filter((item) => item.city.name === activeCity);

const activeCityCoords = ({offers, activeCity}) => {
    const cityHotel = offers.find((item) => item.city.name === activeCity);

    if (!cityHotel) {
        return;
    }

    return [cityHotel.city.location.latitude, cityHotel.city.location.longitude];
}

const hasUserReview = (email, reviews, isLoggedIn) => {
    return isLoggedIn && reviews.findIndex((item) => item.user.name === email.split(`@`)[0]) !== -1; 
}

export {hasOffers, citiesNames, hotelsByCity, activeCityCoords, hasUserReview};
