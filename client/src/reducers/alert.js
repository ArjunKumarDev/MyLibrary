import {SET_ALERT,REMOVE_ALERT} from '../actions/constants';



// eslint-disable-next-line import/no-anonymous-default-export
export default (state=[],action) => {
    const {type,payload} = action;

    console.log(state)
    switch(type) {
        case SET_ALERT: 
           return [...state,payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);   
        default:
            return state;   
    }
}