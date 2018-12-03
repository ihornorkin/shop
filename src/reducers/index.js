import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import phones from './phones';
import phonesPage from './phonesPage';
import phonePage from './phonePage';
import basket from './basket';
import categories from './categories'

export default combineReducers({
    phones,
    phonesPage,
    phonePage,
    basket,
    categories,
    routing: routerReducer
})