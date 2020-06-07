import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from 'firebase'
import Message from './Message'

class Messages extends React.Component {
  state = {
    user: this.props.user,
    messageRef: firebase.database().ref('messages'),
    isLoading: true,
    message: '',
    channel: this.props.channel
  }

  componentDidMount() {
    const { user, channel } = this.state
    if (user && channel)
      this.addListeners(channel.id)
  }

  addListeners = (channelId) => this.addMessageListeners(channelId)
  addMessageListeners = (channelId) => {
    let loadedMessage = []
    this.state.messageRef.child(channelId).on("child_added", snapshot => {
      loadedMessage.push(snapshot.val())
      this.setState({
        isLoading: false,
        message: loadedMessage
      })

    })
  }
  showMessage = (message) => (
    message.length > 0 && message.map(message => (
      <Message
        key={message.timestamp}
        message={message}
      />)
    ))



  render() {
    const { message, user } = this.state
    return (
      <React.Fragment>
        <MessagesHeader channel={this.state.channel} />
        <Segment>
          <Comment.Group style={{
            height: '50vh',
            overflowY: 'scroll'
          }}>
            {this.showMessage(message)}
            <Message />
          </Comment.Group>
        </Segment>

        <MessageForm
          messageRef={this.state.messageRef}
          user={this.state.user}
        />
      </React.Fragment >
    );
  }
}

export default Messages;
