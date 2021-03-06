import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cn from 'classnames';

import ReviewsContainer from '../reviewsContainer/reviewsContainer.jsx';
import ReviewsMap from '../reviewsMap/reviewsMap.jsx';
import {fetchFavorite} from '../../actions/favorites.js';

import maleAvarar from './avatar-max.jpg';
import femaleAvatar from './avatar-angelina.jpg';

const Offer = ({offer, fetchFavorite, isLoggedIn, history, isFavoriteError, isFavoriteLoading}) => {
    const {images, is_premium: isPremium, title, is_favorite: isFavorite, rating, max_adults: maxAdults, type, bedrooms,
            price, goods, id, host, description
        } = offer;
    const divClassName = cn(`property__avatar-wrapper user__avatar-wrapper`,
        {'property__avatar-wrapper--pro': host.is_pro});
    const btnClassName = cn(`property__bookmark-button button` , {'property__bookmark-button--active': isFavorite});

    const buttonClickHandler = () => {
        if(!isLoggedIn) {
            history.push(`/login`);
        } else {
            fetchFavorite(id, isFavorite);
        }
    }
    
    const avatarsByUrl = {
        'img/avatar-angelina.jpg': femaleAvatar,
        'img/avatar-max.jpg': maleAvarar
    }

    let btnContent;

    if(isFavoriteLoading) {
        btnContent = <div>...</div>;
    }
     else if(isFavoriteError) {
        btnContent = <div>Fail</div>;
    } else {
        btnContent = (
            <React.Fragment>
                <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref={(isFavorite) ? `#icon-bookmark-active` : `#icon-bookmark`}></use>
                </svg>
                <span className="visually-hidden">{(isFavorite) ? `In bookmarks` : `To bookmarks`}</span>
            </React.Fragment>
        );
    }

    return (
        <section className="property">
            <div className="property__gallery-container container">
                <div className="property__gallery">
                    {
                        images.slice(0, 6)
                            .map((src) => {
                                return (
                                    <div key={src} className="property__image-wrapper">
                                        <img className="property__image" src={src} alt="Studio" />
                                    </div>
                                );
                            })
                    }
                </div>
            </div>
            <div className="property__container container">
                <div className="property__wrapper">
                    {(isPremium) ? <div className="property__mark"><span>Premium</span></div> : null}

                    <div className="property__name-wrapper">
                        <h1 className="property__name">{title}</h1>
                        <button className={btnClassName} type="button" onClick={buttonClickHandler}
                            title={(isFavorite) ? `Remove from bookmarks` : `Add to bookmarks`}
                        >
                            {btnContent}
                        </button>
                    </div>
                    <div className="property__rating rating">
                        <div className="property__stars rating__stars">
                            <span style={{width: `${20 * rating}%`}}></span>
                            <span className="visually-hidden">Rating</span>
                        </div>
                        <span className="property__rating-value rating__value">{rating}</span>
                    </div>
                    <ul className="property__features">
                        <li className="property__feature property__feature--entire">{type}</li>
                        <li className="property__feature property__feature--bedrooms">{bedrooms} Bedrooms</li>
                        <li className="property__feature property__feature--adults">Max {maxAdults} adults</li>
                    </ul>
                    <div className="property__price">
                        <b className="property__price-value">&euro;{price}</b>
                        <span className="property__price-text">&nbsp;night</span>
                    </div>
                    <div className="property__inside">
                        <h2 className="property__inside-title">What&apos;s inside</h2>
                        <ul className="property__inside-list">
                            {
                                goods.map((item) => {
                                    return (
                                        <li key={item} className="property__inside-item">{item}</li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div className="property__host">
                        <h2 className="property__host-title">Meet the host</h2>
                        <div className="property__host-user user">
                            <div className={divClassName}>
                                <img className="property__avatar user__avatar" src={avatarsByUrl[host.avatar_url]}
                                    width="74" height="74" alt="Host avatar"
                                />
                            </div>
                            <span className="property__user-name">{host.name}</span>
                        </div>
                        <div className="property__description">
                            <p className="property__text">{description}</p>
                        </div>
                    </div>
                    
                    <ReviewsContainer id={id} />
                </div>
            </div>
            <ReviewsMap offer={offer} />
        </section>
    );
}

Offer.propTypes = {
    fetchFavorite: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    history: PropTypes.object,
    isFavoriteError: PropTypes.bool.isRequired,
    isFavoriteLoading: PropTypes.bool.isRequired,
    offer: PropTypes.shape({
        price: PropTypes.number.isRequired,
        is_favorite: PropTypes.bool.isRequired,
        is_premium: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.oneOf([`room`, `house`, `hotel`, `apartment`]).isRequired,
        preview_image: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        bedrooms: PropTypes.number.isRequired,
        max_adults: PropTypes.number.isRequired,
        goods: PropTypes.arrayOf(PropTypes.string).isRequired,
        host: PropTypes.shape({
            id: PropTypes.number.isRequired,
            is_pro: PropTypes.bool.isRequired,
            name: PropTypes.string.isRequired,
            avatar_url: PropTypes.string.isRequired
        }),
        description: PropTypes.string.isRequired,
        location: PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            zoom: PropTypes.number.isRequired
        })
    })
}

const mapStateToProps = ({auth: {isLoggedIn}, offers: {isFavoriteError, isFavoriteLoading}}) => {
    return {
        isLoggedIn,
        isFavoriteError,
        isFavoriteLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFavorite: bindActionCreators(fetchFavorite, dispatch)
    }
}

export {Offer};
export default connect(mapStateToProps, mapDispatchToProps)(Offer);
