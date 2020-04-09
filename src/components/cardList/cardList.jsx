import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchOffers} from '../../actions.js';
import Card from '../card/card.jsx';
import Spinner from '../spinner/spinner.jsx';
import {hasOffers, hotelsByCity} from '../../selectors.js';

class CardList extends React.PureComponent {
    static propTypes = {
        offers: PropTypes.arrayOf(PropTypes.shape({
            price: PropTypes.number.isRequired,
            is_favorite: PropTypes.bool.isRequired,
            is_premium: PropTypes.bool.isRequired,
            rating: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            preview_image: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired
        })),
        isLoading: PropTypes.bool.isRequired,
        hasOffers: PropTypes.bool.isRequired,
        fetchOffers: PropTypes.func.isRequired,
        activeCity: PropTypes.string
    }

    componentDidMount() {
        this.props.fetchOffers();
    }

    render() {
        const {offers, isLoading, hasOffers, activeCity} = this.props;

        if (isLoading) {
            return <Spinner />
        }

         if (!hasOffers) {
            return (
                <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the
                        moment in {activeCity}
                    </p>
                </div>
            );
        }

        return (
            <div className="cities__places-list places__list tabs__content">
                {
                    offers.map((offer) => {
                        return (
                            <Card key={offer.id} offer={offer} />
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        offers: hotelsByCity(state),
        isLoading: state.isLoading,
        hasOffers: hasOffers(state),
        activeCity: state.activeCity
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOffers: bindActionCreators(fetchOffers, dispatch)
    }
}

export {CardList};
export default connect(mapStateToProps, mapDispatchToProps)(CardList);
