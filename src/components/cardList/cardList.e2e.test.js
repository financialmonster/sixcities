import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CardList from './cardList.jsx';

Enzyme.configure({adapter: new Adapter()});
