import {ADD_BOOK,BOOK_ERROR,LOAD_BOOKS,LOAD_BOOK,DELETE_BOOK} from "../actions/constants";



const initialState = {
    books:[],
    isLoading:true,
    book:null,
    error:{}
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState,action) {
    const {type,payload} = action;
    switch(type) {
        case ADD_BOOK:
            return{
                ...state,
                books:[...state.books,payload],
                isLoading:false
            }
        case LOAD_BOOKS:
            return{
                ...state,
                books:payload,
                isLoading:false
            }
         case LOAD_BOOK:
             return{
                 ...state,
                 book:payload,
                 isLoading:false
             } 
         case DELETE_BOOK:
             return{
                 ...state,
                 books:state.books.filter(book => book._id !== payload),
                 isLoading:false
             }    
         case BOOK_ERROR:
             return{
                 ...state,
                 book:null,
                 isLoading:false
             }      
         

        default:
            return state;    
    }
}