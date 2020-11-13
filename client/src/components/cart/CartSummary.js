import React,{useState,useEffect} from "react";
import {Button,Segment,Divider} from "semantic-ui-react";
import calculateCartTotal from  "../../utils/calculateCartTotal";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const CartSummary = ( { carts,success } ) => {

  const [cartEmpty,setCartEmpty] = useState(false)
  const [cartAmount,setCartAmount] = useState(0)
  const [stripeAmount,setStripeAmount] = useState(0)

  useEffect(() => {

     const { cartTotal,stripeTotal } = calculateCartTotal(carts)
     setCartAmount(cartTotal)
     setStripeAmount(stripeTotal)
     setCartEmpty(carts.length === 0)
  },[carts])


  const handleCheckOut = async (paymentData) => {
    console.log("payemnt",paymentData)
    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }

    const body = JSON.stringify({paymentData})
    const res = await axios.post("/checkout",body,config)

    console.log("checkres",res)
  }

  return (
   
  <>
      <Divider />
        <Segment clearing size="large">
            <strong>Sub total:</strong> $ {cartAmount}

            <StripeCheckout
             name="MyLibrary"
             amount={stripeAmount}
             image={carts.length > 0 ? carts[0].book.cover : ""}
             shippingAddress={true}
             zipCode={true}
             currency="INR"
             stripeKey="pk_test_51HbqTgCZ3MS7PpwcdLTst7THGORVbJCS9Xh8U4WXxpSmb7KManqMB0Y0yE9ipAm3QeO9ejhFiH3wgHTCI0LbUKIu00vxUPHsFV"
             billingAddress={true}
             token={handleCheckOut}
             triggerEvent={"onClick"}
            >
            <Button 
              icon="cart"
              color="teal"
              disabled={cartEmpty || success}
              floated="right"
              content="Checkout"
            />
            </StripeCheckout>
        </Segment>
  </>
  );
}

export default CartSummary;
