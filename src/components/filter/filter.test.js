import React from 'react';
import renderer from 'react-test-renderer';

import {Filter} from './filter.jsx';

const offers =  [{price: 120, is_premium: true, is_favorite: false, rating: 4, src: `img/apartment-01.jpg`,
    title: `Beautiful luxurious apartment at great location`, type: `Apartment`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`, id: 0},
    {price: 100, is_premium: false, is_favorite: true, rating: 5, src: `img/apartment-02.jpg`,
    title: `Perfectly located Castro`, type: `Room`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`, id: 1},
    {price: 80, is_premium: true, is_favorite: true, rating: 3, src: `img/apartment-03.jpg`,
    title: `Waterfront with extraordinary view`, type: `Hotel`,
    preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, id: 2}
];

it(`Correctly renders the Filter component`, () => {
    const tree = renderer.create(
        <Filter sortBy={() => {}} currentSorting='Top rated first' activeCity='Paris' offers={offers} />)
    .toJSON();

    expect(tree).toMatchSnapshot();
});
