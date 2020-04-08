import React, { Component } from "react";
import "./App.css";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import { Grid } from "semantic-ui-react";
import { connect } from 'react-redux'

class App extends Component {
  state = {
    currentUser: ""
  }
  componentDidMount() {
    this.setState({
      currentUser: this.props.currentUser
    })
  }

  render() {
    return (
      <Grid columns="equal" className="app" style={{ background: "#eee" }}>
        <ColorPanel />
        <SidePanel currentUser={this.state.currentUser} />
        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages />
        </Grid.Column>

        <Grid.Column width={4}>
          <MetaPanel />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps, null)(App);
