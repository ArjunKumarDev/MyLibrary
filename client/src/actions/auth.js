import axios from "axios";
import {REGISTER_SUCCESS,REGISTER_FAIL,LOGIN_SUCCESS,LOGIN_FAIL,LOG_OUT,LOAD_USER,AUTH_ERROR,LOAD_USERS} from "./constants";
import {setAlert} from "./alert";
import setAuthtoken from '../utils/setAuthtoken';

// loaduser
export const loaduser = () =>  async dispatch => {
    if(localStorage.token) {
        setAuthtoken(localStorage.token)
    }

    try {
        
        const res = await axios.get("/auth")
        dispatch({type:LOAD_USER,payload:res.data})
    } catch (err) {
            dispatch({type:AUTH_ERROR})
    }
}

// Signup
export const signup = ({ name,email,password }) => async dispatch => {

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({name,email,password})
    try{

        const res = await axios.post("/signup",body,config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })

    }catch(err) {

        
        dispatch({type:REGISTER_FAIL})
    
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg))
            })
        }
    }
}   


// Login
export const login = ({ email,password },history) => async dispatch => {
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({email,password})

    try{
        const res = await axios.post("/auth",body,config)

        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })

        dispatch(loaduser())
        history.push("/account")

    }catch(err) {
        dispatch({type:LOGIN_FAIL})


        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg))
            })
        }
    }
}

export const logout = (history) =>  dispatch => {
    dispatch({type:LOG_OUT})
    history.push("/login")
}

//Load all users
export const getUsers = () =>  async dispatch => {
    try{
        const res = await axios.get("/users")
        dispatch({type:LOAD_USERS,payload:res.data})
    }catch(err) {

    }
}