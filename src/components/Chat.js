import React, { Component } from "react";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [], // [{content: 'some message', self: true}]
      typedMessage: "",
    };
  }

  render() {
    const { messages, typedMessage } = this.state;

    return (
      <div className="chat-container">
        <div className="chat-header">Chat</div>

        <div className="chat-message">
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

export default Chat;
