import React,{useEffect,Fragment} from 'react';
import {loadBooks} from "../../actions/books";
import {useDispatch,connect} from "react-redux";
import BooksList from "./BooksList";
import Loader from '../loader/Loader';

const MyLibrary = ({ books }) => {

  
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBooks())
    },[dispatch])

  return (
    <Fragment>
        {books.length > 0 ? <BooksList books={books} /> : <Loader />}
    </Fragment>
  )
}


const mapStateToProps = state => ({
    books:state.books.books
})

export default connect(mapStateToProps)(MyLibrary)
