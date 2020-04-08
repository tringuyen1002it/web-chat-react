import React from "react";
import fisebase from '../../firebase'
import { Grid, Header, Icon, Image, Dropdown } from "semantic-ui-react";

class UserPanel extends React.Component {

  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.props.currentUser.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={() => this.handleSignOut()}>Sign Out</span>
    }
  ];

  handleSignOut = () => {
    fisebase
      .auth()
      .signOut()
      .then(() => console.log("SIGN OUT!"))
  }
  render() {
    const { currentUser } = this.props
    console.log("UserPanel -> render -> currentUser", currentUser)
    return (
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>DevChat</Header.Content>
            </Header>
          </Grid.Row>

          {/* User Dropdown  */}
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={<span>
                <Image src={currentUser.photoURL} avatar />
                {currentUser.displayName}</span>}
              options={this.dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
