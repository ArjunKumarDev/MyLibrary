import axios from "axios";
import {ADD_BOOK,BOOK_ERROR,LOAD_BOOKS,LOAD_BOOK,ADD_CART_FAIL,DELETE_BOOK} from "../actions/constants";
import {loaduser} from "./auth";





// get all books
export const loadBooks = () =>  async dispatch => {
    try{
        const res = await axios.get("/books");
        dispatch({type:LOAD_BOOKS,payload:res.data})
        dispatch({type:ADD_CART_FAIL})
    }catch(err) {

    }
}

// Add books
export const addBooks = (bookData,history) => async dispatch => {

    console.log(bookData,"bookData")
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    try{
        const res = await axios.post("/books",bookData,config);
        dispatch({
            type:ADD_BOOK,
            payload:res.data
        })
        history.push("/")
    }catch(err){

    }
}

// get single book 
export const getSingleBook = (bookId) =>  async dispatch => {
 
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }



    try{
        
        const res = await axios.post(`/books/${bookId}`,config)
        
        dispatch({
            type:LOAD_BOOK,
            payload:res.data
        })

    }catch(err) {
        
         dispatch({type:BOOK_ERROR})
    }
}


// Delete book
export const deleteBook = (bookId,history) =>  async dispatch => {
    try{
        await axios.delete(`/books/${bookId}`)
        dispatch({type:DELETE_BOOK,payload:bookId})
        history.push("/")
    }catch(err) {
        dispatch({type:BOOK_ERROR})
    }
}