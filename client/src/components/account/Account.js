import React,{Fragment,useEffect} from "react";
import AccountHeader from './AccountHeader';
import AccountOrders from "./AccountOrders";
import {connect,useDispatch} from "react-redux";
import {getUsers} from "../../actions/auth";
import AccountPermission from "./AccountPermission";
import Loader from "../loader/Loader";


const Account = ({ users,user }) => {
   

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
    },[dispatch])
 
  return(
       <Fragment>
         {user ? 
            <>
            <AccountHeader  />
            <AccountOrders  />
            {user.role === "root" && <AccountPermission users={users} /> }
           </>
           :
           <Loader />
          
            }
        </Fragment>
  )
}


const mapStateToProps = state => ({
    users:state.auth.users,
    user:state.auth.user
})


export default connect(mapStateToProps)(Account);
