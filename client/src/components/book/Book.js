import React,{useEffect,Fragment} from "react";
import BookSummary from "./BookSummary";
import BookAttributes from "./BookAttributes";
import {useDispatch,connect} from "react-redux";
import {getSingleBook} from "../../actions/books";
import Loader from "../loader/Loader";
import {Container} from "semantic-ui-react";


const Book = ({book,user,match,auth:{isLoading}}) => {

    console.log("sdfsdafasdfasdf",book)
   
    const dispatch = useDispatch();



    useEffect(() => {
        
              dispatch(getSingleBook(match.params.id))
    },[dispatch,match.params.id])
    
  
  return (
    <Fragment>
        {book ? ( 
            <Fragment>
              <Container text>
                <BookSummary book={book}  />
                <BookAttributes book={book} user={user} />
                </Container>
            </Fragment>
        )
      : <Loader />
        }
    </Fragment>
  );
}



const mapStateToProps = state => ({
    book:state.books.book,
    auth:state.auth,
    user:state.auth.user
})
     

export default connect(mapStateToProps,{getSingleBook})(Book);
