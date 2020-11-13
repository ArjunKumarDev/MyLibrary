import {ADD_CART,ADD_CART_FAIL,GET_CART,REMOVE_CART} from "../actions/constants";

const initialState = {
    carts:[],
    isLoading:false,
    cartAdded:false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState,action) {
        const{type,payload} = action;

        switch(type) {
            case GET_CART:
                return{
                    ...state,
                    carts:payload,
                    isLoading:true
                }  
            case ADD_CART:
                return{
                    ...state,
                    cartAdded:true
                }
             case ADD_CART_FAIL:
                 return{
                     ...state,
                     cartAdded:false
                 } 
             case REMOVE_CART:
                 return{
                     ...state,
                     carts:state.carts.filter(c => c.book._id !== payload),
                     isLoading:true
                 }
              default:
                  return state; 
        }
}