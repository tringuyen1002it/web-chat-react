import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import firebase from 'firebase'
import { connect } from 'react-redux'

class MessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      errors: [],
      user: this.props.user,
      messageRef: this.props.messageRef,
    }
  }

  handleChange = (event) => {
    this.setState({
      message: event.target.value,
    })
  }

  handleSubmit = (event) => {
    const { messageRef, message } = this.state
    const { channel } = this.props
    event.preventDefault()
    if (message && channel && channel.currentChannel) {
      this.setState({ loading: true });
      messageRef
        .child(channel.currentChannel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" })
      });
    }
  }

  createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL
      },
      content: this.state.message
    }
    return message
  }

  render() {
    const { errors, message, loading } = this.state
    return (
      <Segment className="message__form">
        <Input
          onChange={this.handleChange}
          fluid
          name="message"
          value={message}
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          placeholder="Write your message"
          className={
            errors.some(error => error.message.includes("message"))
              ? "error"
              : ""
          }
        />
        <Button.Group icon widths="2">
          <Button
            color="orange"
            content="Add Reply"
            labelPosition="left"
            disabled={loading}
            icon="edit"
            onClick={this.handleSubmit}
            disabled={loading}
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    );
  }
}
const mapStateToProps = (state) => ({
  channel: state.channel
})

export default connect(mapStateToProps, null)(MessageForm);
