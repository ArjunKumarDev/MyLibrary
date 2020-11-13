import {LOAD_ORDERS} from '../actions/constants';

const initialState = {
    orders:[],
    isLoading:true
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState,action) {
    const {type,payload} = action;
    switch(type) {
        case LOAD_ORDERS:
            return{
                ...state,
                orders:[...payload],
                isLoading:false
            }
        default:
            return state;    
    }
}