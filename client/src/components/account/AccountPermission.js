import React,{useState,useEffect,useRef } from "react";

import {Header,Icon, Table, Checkbox} from "semantic-ui-react";
import formatDate from "../../utils/formatDate";
import {useDispatch,connect} from "react-redux";
import axios from "axios";



const AccountPermissions = ({users}) => {




  return (
    <div style={{ margin: '2em 0'}}>
        <Header as="h2">
          <Icon name="settings" />
          User Permissions
          </Header>

          <Table compact celled definition>
             <Table.Header>
               <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Joined</Table.HeaderCell>
                  {/* <Table.HeaderCell>Updated</Table.HeaderCell> */}
                  <Table.HeaderCell>Role</Table.HeaderCell>

               </Table.Row>
             </Table.Header>

             <Table.Body>
                {users && users.length > 0 && users.map(user => (
                  <UserPermission key={user._id} user={user} />
                ))}
             </Table.Body>
           </Table>
        
    </div>
  )
}


const UserPermission = ({ user }) => {

  const [admin,setAdmin] = useState(user.role === "admin")

  const isFirstRun = useRef(true)

  const handleChangePermissions = () => {
      setAdmin(prevState => !prevState)
  }

  useEffect(() => {
     if(isFirstRun.current) {
       isFirstRun.current = false;
       return
     }

     updatePermission()
     
  },[admin])

  const updatePermission = async () => {
      
    const url = `/users`
    const payload = { _id: user._id, role:admin ? "admin" : "user"}
    await axios.put(url,payload)
  }

  
  return(
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox checked={admin} toggle onChange={handleChangePermissions} />
      </Table.Cell>

      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{formatDate(user.date)}</Table.Cell>
      {/* <Table.Cell>{formatDate(user.updatedAt)}</Table.Cell> */}
      <Table.Cell>{admin ? "admin" : "user"}</Table.Cell>

    </Table.Row>
  )
}


// const mapStateToProps = state => ({
//     users:state.auth.users
// })

export default AccountPermissions;
