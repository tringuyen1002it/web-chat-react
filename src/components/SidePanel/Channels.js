import React from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firesebase from 'firebase'

class Channels extends React.Component {
  state = {
    channels: [],
    channelName: "",
    channelDetails: "",
    modal: false,
    channelRef: firesebase.database().ref('channel')
  };

  componentDidMount() {
    let channelDetail = []
    this.state.channelRef.on('child_added', (snapshot) => {
      channelDetail.push(snapshot.val())
      console.log("Channels -> componentDidMount -> channelDetail", channelDetail)
      console.log("Channels -> componentDidMount -> snappshot", snapshot.val())

    })

  }
  // ref.orderByChild("height").on("child_added", function(snapshot) {
  //   *   console.log(snapshot.key + " was " + snapshot.val().height + " m tall");
  //   * });
  handleChange = event => {
    console.log("Channels -> event", event.target.name)

    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault()
    if (this.isFormValid(this.state)) {
      this.addChannel()
    }
  }

  addChannel = () => {
    const { channelRef, channelDetails, channelName } = this.state
    const { currentUser } = this.props
    // console.log("Channels -> addChannel -> currentUser", currentUser)
    const key = channelRef.push().key
    const newChannel = {
      id: key,
      name: channelName,
      detail: channelDetails,
      createdBy: {
        name: currentUser.displayName,
        photoURL: currentUser.photoURL,
        email: currentUser.email
      }
    }
    channelRef.child(key).update(newChannel).then(() => {
      this.setState({
        channelDetails: '',
        channelName: ''
      })
      this.closeModal()
    }).catch((err) => console.log(err))
  }
  isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails

  displayChannelItem = () => {
    const { channelName, channelDetails } = this.state
    console.log("Channels -> displayChannelItem -> channelName", channelName)
    return (<Menu.Item
      name={channelName}
      style={{ opacity: 0.7 }}
    >
      {channelName}

    </Menu.Item>)
  }

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  render() {
    const { channels, modal } = this.state;

    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannelItem()}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions >
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Channels;
