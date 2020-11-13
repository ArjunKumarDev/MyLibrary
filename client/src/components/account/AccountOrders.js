import React,{useEffect,Fragment} from 'react';
import {connect,useDispatch} from "react-redux";
import {loadOrders} from "../../actions/orders";
import {Header,Accordion,Label,Segment,Icon,Button,List,Image} from "semantic-ui-react";
import formatDate from "../../utils/formatDate";
import {withRouter} from "react-router-dom";
import Loader from "../loader/Loader";

const AccountOrders = ({ orders,history,isLoading }) => {

    console.log("orders",orders)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadOrders())
    },[dispatch])


    const mapOrdersToPanels = (orders) => {
        return orders.map(order => ({
          key:order._id,
          title:{
            content: <Label color="blue" content={formatDate(order.date)} />
          },
          content:{
            content : (
              <>
                <List.Header as="h3">
                  Total: ${order.total}
                  <Label content={order.email} icon="mail" basic horizontal style={{ marginLeft: "1em" }} />
                </List.Header>
  
                <List>
                  {order.books.map(p => (
  
                    <List.Item key={p.book._id}>
                      <Image avatar src={p.book.cover} />
                      <List.Content>
                         <List.Header>{p.book.title}</List.Header>
                         <List.Description>
                           {p.quantity} . ${p.book.price}
                         </List.Description>
                      </List.Content>
  
                      <List.Content floated="right">
                          <Label tag color="red" size="tiny">
                            {p.book.author}
                          </Label>
                      </List.Content>
  
                    </List.Item>
                    
                  ))}
                </List>
            </>
            )
          }
        }))
    }
  

  return (
      <Fragment>
    <Header as="h2">
      <Icon name="folder open" />
         Order History
   </Header>

   {orders.length === 0 && isLoading && <Loader />}

   {orders.length === 0  ? (
     <Segment inverted tertiary color="grey" textAlign="center">
       <Header icon>
          <Icon name="copy outline" />
           No past orders...
       </Header>

       <div>
         <Button onClick={() => history.push("/")} color="orange">
                View Books
         </Button>
       </div>
     </Segment>
   ) : (
     <Accordion 
      fluid
      styled
      exclusive={false}
      panels={mapOrdersToPanels(orders)}
     />
   )}
   </Fragment>
  )
}

const mapStateToProps = state => ({
    orders:state.orders.orders,
    isLoading:state.orders.isLoading
})

export default connect(mapStateToProps)(withRouter(AccountOrders))
