import {REGISTER_SUCCESS,REGISTER_FAIL,LOGIN_SUCCESS,LOGIN_FAIL,LOG_OUT,LOAD_USER,AUTH_ERROR,LOAD_USERS} from "../actions/constants";


const initialState = {
    token: null,
    isAuthenticated:null,
    isLoading:true,
    user:null,
    users:[]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action) {
    const {type,payload} = action;

    // eslint-disable-next-line default-case
    switch(type) {
        case LOAD_USER:
            return{
                ...state,
                isAuthenticated:true,
                isLoading:false,
                user:payload
            }
         case LOAD_USERS:
             return{
                 ...state,
                 isLoading:false,
                 users:[...payload]
             }   
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token",payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                isLoading:false
            }

        case REGISTER_FAIL:
        case LOGIN_FAIL:    
        case LOG_OUT:
        case AUTH_ERROR:
            localStorage.removeItem("token")
            return{
               token:null,
               isAuthenticated:false,
               isLoading:false
            }    
        default:
            return state;    
    }
}