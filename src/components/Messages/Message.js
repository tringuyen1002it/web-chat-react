import React, { useEffect } from "react";
import { Comment } from 'semantic-ui-react'
import moment from 'moment'


const Message = ({ message }) => {
    if (message) {
        return (
            <Comment>
                <Comment.Avatar src={message.user.avatar} />
                <Comment.Content>
                    <Comment.Author as='a'>{message.user.name}</Comment.Author>
                    <Comment.Metadata>
                        <div>{moment(message.timestamp).fromNow()}</div>
                    </Comment.Metadata>
                    <Comment.Text>{message.content}</Comment.Text>
                </Comment.Content>
            </Comment>
        )
    } else return null
}

export default Message
