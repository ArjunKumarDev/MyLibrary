import {Item,Label} from 'semantic-ui-react';
import AddBookToCart from './AddBookToCart';



const BookSummary = ({book}) => {
  
  return(
    <Item.Group>
      <Item>
        <Item.Image size="medium" src={book.cover} />
        <Item.Content>
        <Item.Header>{book.title}</Item.Header>
        <Item.Description>
           <p>${book.price}</p>
        </Item.Description>
        <Item.Extra>
          <AddBookToCart  bookId={book._id} />
        </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default BookSummary;
