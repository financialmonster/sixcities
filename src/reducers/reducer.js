import sortOffers from '../utils/sortOffers.js';

const initialState = {
    offers: [],
    comments: [],
    currentHotel: null,
    isLoading: true,
    isError: false,
    isLoggedIn: false,
    currentSorting: `Popular`,
    email: null,
    isAuthLoading: false,
    isAuthError: false,
    activeCity: null,
    focusedCard: null,
    isCommentsLoading: false,
    isCommentsError: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case `FETCH_OFFERS_REQUEST`:
            return {
                ...state,
                offers: [],
                isLoading: true,
                isError: false
            }

        case `FETCH_OFFERS_SUCCESS`:
            console.log(action.payload.offers);            
            
            return {
                ...state,
                isError: false,
                isLoading: false,
                activeCity: action.payload.activeCity,
                offers: action.payload.offers,
            }

        case `FETCH_OFFERS_FAIL`:
            return {
                ...state,
                offers: [],
                isLoading: false,
                isError: true,
            }

        case `SORT_BY`:
            return {
                ...state,
                offers: sortOffers(state.offers, action.payload),
                currentSorting: action.payload
            }

        case `ACTIVE_CITY_CHANGE`:
            return {
                ...state,
                activeCity: action.payload
            }

        case `FETCH_AUTH_REQUEST`:
            return {
                ...state,
                email: null,
                isAuthLoading: true,
                isAuthError: false,
                isLoggedIn: false
            }

        case `FETCH_AUTH_SUCCESS`:
            return {
                ...state,
                email: action.payload,
                isAuthLoading: false,
                isAuthError: false,
                isLoggedIn: true
            }

        case `FETCH_AUTH_FAIL`:
            return {
                ...state,
                email: null,
                isAuthLoading: false,
                isAuthError: true,
                isLoggedIn: false
            }

        case `FOCUS_CARD`:            
            return {
                ...state,
                focusedCard: action.payload
            }

         case `BLUR_CARD`:
            return {
                ...state,
                focusedCard: null
            }
        
        case `FETCH_COMMENTS_REQUEST`:
            return {
                ...state,
                comments: [],
                isCommentsLoading: true,
                isCommentsError: false
            }

        case `FETCH_COMMENTS_SUCCESS`:
            return {
                ...state,
                comments: action.payload,
                isCommentsLoading: false,
                isCommentsError: false
            }

        case `FETCH_COMMENTS_FAIL`:
            return {
                ...state,
                comments: [],
                isCommentsLoading: false,
                isCommentsError: true
            }

        case `SET_CURRENT_HOTEL`:
            return {
                ...state,
                currentHotel: action.payload
            }

        default:
            return state;
    }
}

export default reducer;