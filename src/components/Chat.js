import React, { Component } from "react";
import { connect } from "react-redux";
import { io } from "socket.io-client";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [], // [{content: 'some message', self: true}]
      typedMessage: "",
    };

    this.socket = io.connect();
    this.userEmail = props.user.email;
    if (this.userEmail) {
      this.setupConnections();
    }
  }

  setupConnections = () => {
    // it actually forms a closure
    const chat = this;

    this.socket.on("connect", () => {
      console.log("connection established");

      chat.socket.emit("join_room", {
        user_email: this.userEmail,
        chatroom: "codeial",
      });

      chat.socket.on("user_joined", function (data) {
        console.log("New User Joined the chatroom", data);
      });
    });

    this.socket.on("receive_message", function (data) {
      const { messages } = chat.state;
      const newMessage = {};

      newMessage.content = data.message;
      if (data.user_email === chat.userEmail) {
        newMessage.self = true;
      }

      chat.setState({
        messages: [...messages, newMessage],
        typedMessage: "",
      });
    });
  };

  handleSubmitMessage = () => {
    const { typedMessage } = this.state;
    
    if (typedMessage && this.userEmail) {
      this.socket.emit("send_message", {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: "codeial",
      });
    }
  };

  render() {
    const { messages, typedMessage } = this.state;

    return (
      <div className="chat-container">
        <div className="chat-header">Chat</div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                message.self
                  ? "chat-bubble self-chat"
                  : "chat-bubble other-chat"
              }
            >
              {message.content}
            </div>
          ))}
        </div>

        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button className="self-message-btn">Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Chat);
