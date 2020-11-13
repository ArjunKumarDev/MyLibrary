import React from "react";
import {Header,Icon,Segment,Label} from "semantic-ui-react";
import {connect} from "react-redux";
import formatDate from "../../utils/formatDate";

const AccountHeader = ({ user }) => {
  return(
     
    <Segment secondary inverted color="violet">
      <Label 
       color="teal"
       size="large"
       ribbon
       icon="privacy"
       style={{ textTransform: 'capitalize' }}
       content={user && user.role}
      />

      <Header inverted textAlign="center" as="h1" icon>

        <Icon name="user" />
        {user && user.name}
        <Header.Subheader>{user && user.email}</Header.Subheader>
        <Header.Subheader>Joined {formatDate(user && user.date)}</Header.Subheader>
      </Header>
    </Segment>
  )
}


const mapStateToProps = state => ({
    user:state.auth.user
})

export default connect(mapStateToProps)(AccountHeader);
