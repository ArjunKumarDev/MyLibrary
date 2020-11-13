import React, { useState,Fragment } from 'react';
import {Header,Button,Modal} from 'semantic-ui-react';
import {withRouter} from "react-router-dom";
import {deleteBook} from "../../actions/books";
import {useDispatch} from "react-redux";


const BookAttributes = ({book,history,user}) => {

 const dispatch = useDispatch();

 const root = user && user.role === "root";
 const admin = user && user.role === "admin";
 const isRootOrAdmin = root || admin;

  const [modal,setModal] = useState(false)


  const handleDelete = (bookId) => {
      dispatch(deleteBook(bookId,history))
  }



  return <Fragment>
      <Header as="h3"> About this book </Header>
      <p>{book.description}</p>

   
     {isRootOrAdmin && 
      <Button icon="trash alternate outline" color="red" content="Delete Book" onClick={() => setModal(true)} />
       }

      <Modal open={modal} dimmer="blurring">
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content><p>Are you sure want to delete this book?</p></Modal.Content>
        <Modal.Actions>
           <Button content="Cancel" onClick={() => setModal(false)} />
           <Button negative icon="trash" labelPosition="right" content="Delete" onClick={() => handleDelete(book._id)} />
        </Modal.Actions>
      </Modal>

      </Fragment>
 
}

export default withRouter(BookAttributes);
