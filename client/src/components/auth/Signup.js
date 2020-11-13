import React,{ useState,useEffect,Fragment} from "react";
import {useDispatch} from "react-redux";
import {Button,Icon,Form,Message,Segment,Container} from "semantic-ui-react";
import {Link} from "react-router-dom";

import {signup} from "../../actions/auth";
import {connect} from "react-redux";



const INITIAL_USER = {
  name:"",
  email:"",
  password:""
}

const Signup = ({ errors }) => {


  const [user,setUser] = useState(INITIAL_USER)
  const [disabled,setDisabled] = useState(false)
  const [loading,setLoading] = useState(false)
  

  const dispatch = useDispatch();



  const handleChange = (event) => {

    const {name,value} = event.target;
   
    setUser(prevState => ({ ...prevState,[name]:value }))
  }

  const onSubmit = (e) => {

    const {name,email,password} = user;
      e.preventDefault();
      dispatch(signup({ name,email,password }))
  }


  return(
    <Fragment>
    <Container text>

       <Message attached icon="settings" header="Get Started" content="Create a new account" color="teal" />


       <Form   error={errors} loading={loading} onSubmit={onSubmit}>
         
          {errors.length > 0 && errors.map(err => (
            <Message error={true} header="Oops!" content={err.msg} /> 
            ))
          }

      
      
         <Segment>
           <Form.Input 
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
           />

        <Form.Input 
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            value={user.email}
            type="email"
            onChange={handleChange}
           />
 
       <Form.Input 
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            value={user.password}
            type="password"
            onChange={handleChange}
           />

           <Button
             disabled={disabled}
             loading={loading}
             icon="signup"
             type="submit"
             color="orange"
             content="Signup"
            />
         </Segment>
       </Form>
     

       <Message attached warning>
          <Icon name="help" />
           Existing user? {" "}
           <Link to="/login">
             <a>Log in here</a>
           </Link> {" "} instead
       </Message>
       </Container>
    </Fragment>
  )
}

const mapStateToProps = state => ({
   errors:state.alert,
   auth:state.auth
})
export default connect(mapStateToProps)(Signup);
