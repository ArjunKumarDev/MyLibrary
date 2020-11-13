import React,{ useState,useEffect } from "react";
import {Button,Icon,Form,Message,Segment} from "semantic-ui-react";
import {Link,withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../../actions/auth";
import {connect} from "react-redux";




const INITIAL_USER = {
  email:"",
  password:""
}

const Login = ({ errors,auth:{isAuthenticated},history }) => {


  const dispatch = useDispatch();
  const [user,setUser] = useState(INITIAL_USER)
  const [disabled,setDisabled] = useState(false)
  const [loading,setLoading] = useState(false)

//   useEffect(() => {
  
//      const isUser = Object.values(user).every(el => Boolean(el))

//      isUser ? setDisabled(false) : setDisabled(true)
//   },[user])  

  const handleChange = (event) => {

    const {name,value} = event.target;
   
    setUser(prevState => ({ ...prevState,[name]:value }))
  }


  const handleSubmit = (e) => {
      const {email,password} = user;
      e.preventDefault();

      dispatch(login({email,password},history))
  }
 

  return(
    <>
       <Message attached icon="privacy" header="Welcome Back!" content="Log in with email and password" color="blue" />

       <Form success={isAuthenticated} error={errors} loading={loading} onSubmit={handleSubmit}>

       {errors.length > 0 && errors.map(err => (
            <Message error={true} header="Oops!" content={err.msg} /> 
            ))
        }

        {isAuthenticated && <Message success content={"Login Success"} /> }

         <Segment>
          

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
             icon="sign in"
             type="submit"
             color="orange"
             content="Login"
            />
         </Segment>
       </Form>

       <Message attached warning>
          <Icon name="help" />
           New user? {" "}
           <Link to="/signup">
             <a>Sign up here</a>
           </Link> {" "} instead
       </Message>
    </>
  )
}

const mapStateToProps = state => ({
    errors:state.alert,
    auth:state.auth
})

export default connect(mapStateToProps)(withRouter(Login));
