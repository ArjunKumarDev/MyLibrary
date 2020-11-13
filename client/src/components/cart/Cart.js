import React,{ useState,useEffect,Fragment } from "react";
import {Segment} from "semantic-ui-react";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import {useDispatch,connect} from "react-redux";
import {getCartDetails} from "../../actions/cart";
import Loader from "../loader/Loader";


const Cart = ({ carts,isLoading }) => {

 console.log("cartsdata",carts)

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getCartDetails())
  },[dispatch])

  return(
    <Segment>
     {isLoading ?  
     <Fragment>
      <CartItemList carts={carts} /> 
      <CartSummary carts={carts} />
      </Fragment> : <Loader /> }
    </Segment>
  );
}


const mapStateToProps = state => ({
   carts:state.cart.carts,
   isLoading:state.cart.isLoading
})

export default connect(mapStateToProps)(Cart);
