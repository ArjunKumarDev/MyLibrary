import {combineReducers} from "redux";
import alert from './alert';
import auth from './auth';
import books from './books';
import cart from './cart';
import orders from './orders';

export default combineReducers({
    alert,
    auth,
    books,
    cart,
    orders
})