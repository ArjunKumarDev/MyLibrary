import React, { Fragment } from 'react';
import {Link,withRouter} from "react-router-dom";
import {Menu,Container,Image,Icon} from 'semantic-ui-react';
import {logout} from "../../actions/auth";
import {useDispatch} from "react-redux";
import {connect} from "react-redux";
import Book from "../../img/torah.svg";

const Header = ({ auth:{isAuthenticated,user},history }) => {

        const dispatch = useDispatch();

        const root = user && user.role === "root";
        const admin = user && user.role === "admin";
        const isRootOrAdmin = root || admin;

        const handleLogout = () => {
           dispatch(logout(history))
        }

  return (
    <div>
          <Menu fluid id="menu" stackable inverted>
             <Container text>

             <Link to="/">
                      <Menu.Item header>
                            <Image
                              size="mini"
                              src={Book}
                              style={{marginRight:'1rem'}}
                              />
                              MyLibrary
                      </Menu.Item>
              </Link>

                 <Link to="/cart">
                        <Menu.Item header>
                            <Icon
                              name="cart"
                              size="large"
                              />
                              Cart
                         </Menu.Item>
                 </Link>  

                 {isRootOrAdmin && <Link to="/create">
                      <Menu.Item header>
                            <Icon
                              name="add square"
                              size="large"
                              />
                              Create
                      </Menu.Item>
              </Link> }

   {isAuthenticated && 
    <Fragment>
   

              <Link to="/account">
                      <Menu.Item header>
                            <Icon
                              name="user"
                              size="large"
                              />
                              Account
                      </Menu.Item>
              </Link>

              <Menu.Item onClick={handleLogout}  header>
                            <Icon
                              name="sign out"
                              size="large"
                              />
                              Log out
                </Menu.Item>
                </Fragment>
              }

{!isAuthenticated && 
          <Fragment>
          <Link to="/login">
                      <Menu.Item>
                            <Icon
                              name="sign in"
                              size="large"
                              />
                              LogIn
                      </Menu.Item>
              </Link>

              <Link to="/signup">
                      <Menu.Item>
                            <Icon
                              name="signup"
                              size="large"
                              />
                              Signup
                      </Menu.Item>
              </Link>
              </Fragment>
     }

              </Container>
          </Menu>
    </div>
  )
}

const mapStateToProps = state => ({
        auth:state.auth
})

export default connect(mapStateToProps)(withRouter(Header))
