import React,{useState,useEffect} from "react";
import {Input} from 'semantic-ui-react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {useDispatch} from "react-redux";
import {addToCart} from "../../actions/cart";


const AddProductToCart = ({ auth:{isAuthenticated},bookId,history,cart:{cartAdded} }) => {


  const dispatch = useDispatch();

  const [quantity,setQuantity] = useState(1)
  const [loading,setLoading] = useState(false)
  const [success,setSuccess] = useState(false)

  const handleAddCartToProudct = () => {
        dispatch(addToCart(quantity,bookId))
  }


  return <>
       <Input 
        type="number"
        min="1"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
        action={ isAuthenticated && cartAdded ? {
          color:"blue",
          content:"Item Added",
          icon: "plus cart",
          disabled:true
        } : isAuthenticated ? 
          {color:"orange",
          content:"Add to cart",
          loading,
          disabled:loading,
          icon:"plus cart",
          onClick:handleAddCartToProudct} : {color:"blue",content:"Signup to purchase",icon:"signup",onClick: () => history.push("/signup")}
        }
        />
  </>;
}

const mapStateToProps = state => ({
    auth:state.auth,
    cart:state.cart
})

export default connect(mapStateToProps)(withRouter(AddProductToCart));
