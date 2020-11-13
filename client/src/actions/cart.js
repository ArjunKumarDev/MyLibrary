import {ADD_CART,ADD_CART_FAIL,GET_CART,REMOVE_CART} from "./constants";
import axios from "axios";


// Get books from cart 
export const getCartDetails = () => async dispatch => {
    try{
       
        const res = await axios.get("/cart")

        dispatch({type:GET_CART,payload:res.data})

    }catch(err) {
        console.error(err.message)
        dispatch({type:ADD_CART_FAIL})
    }
}

// Add books to cart
export const addToCart = (quantity,bookId) => async dispatch => {

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({ quantity,bookId })
    try{

        await axios.put("/cart",body,config)
        dispatch({type:ADD_CART})

    }catch(err) {
        dispatch({type:ADD_CART_FAIL})
    }
}

// Remove book from cart     
export const removeBook = (bookId) =>  async dispatch => {
    try{
        await axios.delete(`/cart/${bookId}`)
        dispatch({type:REMOVE_CART,payload:bookId})
        dispatch(getCartDetails())
    }catch(err) {
        dispatch({type:ADD_CART_FAIL})
    }
}