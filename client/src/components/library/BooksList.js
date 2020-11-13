import {Card} from 'semantic-ui-react';
import {Redirect,withRouter} from "react-router-dom";


const BooksList = ({books,history}) => {

  const redirect = (id) => {
    
      history.push(`/book/${id}`)
  }

  const mapBooksToItems = books => {
    return books.length > 0 && books.map(book => ({
       header:book.title,
       image:book.cover,
       meta: `$${book.price}`,
       color:"teal",
       fluid:true,
       childKey:book._id,
       onClick: () => redirect(book._id)
     }))
   }

  return <Card.Group stackable itemsPerRow="3" centered items={mapBooksToItems(books)}/>
}

export default withRouter(BooksList);
