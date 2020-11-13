import {Header,Segment,Button,Icon, Item,Message} from "semantic-ui-react";
import {connect,useDispatch} from "react-redux";
import {withRouter} from "react-router-dom";
import {removeBook} from "../../actions/cart";

const CartItemList = ({ carts,success,auth:{isAuthenticated},history }) => {


  const dispatch = useDispatch();
  
 const removeBooksFromCart = (bookId) => {
    dispatch(removeBook(bookId))
 }

  const mapCartProductsToItems = (carts) => {
     return carts.length > 0 && carts.map(p => ({
       childkey: p.book._id,
       header:(
         <Item.Header as="a" onClick={() => history.push(`/book/${p.book._id}`)}>
           {p.book.title}
         </Item.Header>
       ),
       image: p.book.cover,
       meta : `${p.quantity} X $${p.book.price}`,
       fluid:"true",
       extra:(
         <Button
          basic
          icon="remove"
          floated="right"
          onClick={() => removeBooksFromCart(p.book._id)}
          />
       )

     }))
  }

  if(success) {
  
   return <Message success icon="star outline" header="Success!" content="Your order and payment has been accepted" />
  }

  if(carts.length === 0 || !isAuthenticated) {
  return (
    <Segment  placeholder secondary color="teal" inverted textAlign="center">
      
      <Header icon>
         <Icon name="shopping basket" />
         No books in your cart. Add some!
      </Header>

      <div>
        {isAuthenticated ? (
          <Button color="orange" onClick={() => history.push('/')}>
            View Books
          </Button>
        ) : (
          <Button color="blue" onClick={() => history.push('/login')}>
            Login to Add Books
          </Button>
        )}
      </div>

    </Segment>
  )
        }

        return <Item.Group divided items={mapCartProductsToItems(carts)} />
}

const mapStateToProps = state => ({
  auth:state.auth
})

export default connect(mapStateToProps)( withRouter(CartItemList));
