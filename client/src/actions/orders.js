import {LOAD_ORDERS} from "./constants";
import axios from "axios";


// Load orders
export const loadOrders = () =>  async dispatch => {
    try{
        const res = await axios.get("/orders")
        dispatch({type:LOAD_ORDERS,payload:res.data})
    }catch(err) {

    }
}