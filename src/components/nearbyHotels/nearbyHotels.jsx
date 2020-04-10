import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {hotelsByCurrentHotel} from '../../selectors.js';
import Card from '../card/card.jsx';

const NearbyHotels = ({currentHotels}) => {
    let nearbyOffers;

    if(currentHotels.length) {
        nearbyOffers = (
            currentHotels.map((item) => {
                return (
                    <Card key={item.id} offer={item} isNearby={true} />
                );
            })
        );
    } else {
        nearbyOffers = null;
    }

    return (
        <div className="container">
            <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                    {nearbyOffers}
                </div>
            </section>
         </div>
    );
}

NearbyHotels.propTypes = {
    currentHotels: PropTypes.arrayOf(PropTypes.shape({
        price: PropTypes.number.isRequired,
        is_favorite: PropTypes.bool.isRequired,
        is_premium: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        preview_image: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    }))
    }

const mapStateToProps = (state) => {
    return {
        currentHotels: hotelsByCurrentHotel(state)
    }
}

export {NearbyHotels};
export default connect(mapStateToProps, () => ({}))(NearbyHotels);