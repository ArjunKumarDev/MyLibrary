import React,{useState,useEffect} from 'react';
import { Form,Header,Button,Icon,Message,TextArea,Image,Input } from "semantic-ui-react";
import Filebase from "react-file-base64";
import DatePicker from "react-datepicker";

import {useDispatch} from "react-redux";
import {addBooks} from "../../actions/books";
import {withRouter} from "react-router-dom";



const CreateProduct = ({ history }) => {


  const INITIAL_PRODUCT = {
    title:"",
    price:"",
    cover:"",
    description:"",
    totalPage:"",
    author:"",
    publishDate:""
  }


  const [books,setBooks] = useState({
    title:"",
    price:"",
    cover:"",
    description:"",
    totalPage:"",
    author:"",
    publishDate:""
  })


  const dispatch = useDispatch();

  const [preview,setPreview] = useState("")

  const [success,setSuccess] = useState(false)

  const [loading,setLoading] = useState(false)

  const [disabled,setDisabled] = useState(true)

  const [error,setError] = useState("")


  useEffect(() => {
        const isProduct = Object.values(books).every(el => Boolean(el))
        isProduct ? setDisabled(false) : setDisabled(true)
  },[books])

  const handleChange = (event) => {

    const {name,value} = event.target;

    setBooks({ ...books,[name]:value})

   
  }


  const handleSubmit = async (event) => {


    event.preventDefault();

    dispatch(addBooks(books,history))

    setBooks(INITIAL_PRODUCT)
   
  }



  return (
 
    <>
     
    <Header as="h2" block>

      <Icon name="add" color="orange" />
        Create New Book
    </Header>

    <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>

      <Message error content={error} header="Oops!" />

      <Message success icon="check" header="Success!" content="Your product has been posted" />

      <Form.Group widths="equal">
        <Form.Field 
          control={Input}
          name="title"
          label="Title"
          placeholder="Title"
          onChange={handleChange}
          value={books.title}
        />

      <Form.Field 
          control={Input}
          name="author"
          label="Author Name"
          placeholder="Author Name"
          onChange={handleChange}
          value={books.author}
        />

      <Form.Field 
          control={Input}
          name="totalPage"
          label="TotalPage"
          placeholder="TotalPage"
          min="1"
          type="number"
          onChange={handleChange}
          value={books.totalPage}
        />

    <Form.Field 
          control={Input}
          name="price"
          label="Price"
          placeholder="Price"
          min="0.00"
          step="0.01"
          type="number"
          onChange={handleChange}
          value={books.price}
        />

      </Form.Group>

      <Form.Field>
      <label>Media</label>
        <Filebase type="file" multiple={false} onDone={({base64}) => setBooks({ ...books,cover:base64 })} />
      </Form.Field>

      <Image src={books.cover} rounded  size="small" />

      <Form.Field>
          <label>Published Date</label>
            <DatePicker selected={books.publishDate} onChange={(date) => setBooks({...books,publishDate:date})} />
    </Form.Field>

      <Form.Field 
        control={TextArea}
        name="description"
        label="Description"
        placeholder="Description"
        onChange={handleChange}
        value={books.description}
      />

      <Form.Field 
       control={Button}
       disabled={disabled}
       loading={loading}
       color="blue"
       icon="pencil alternate"
       content="Submit"
       type="Submit"
      />
    </Form>
    </>
  );
}

export default withRouter(CreateProduct);
