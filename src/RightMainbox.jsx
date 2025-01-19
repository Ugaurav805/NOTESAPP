import React, { useState, useEffect, useRef } from "react";
import { FiLock, FiSend } from "react-icons/fi";

const RightMainbox = ({ activeGroup, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const messagesRef = useRef();

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [activeGroup?.messages]);

  const handleSend = () => {
    if (message.trim()) {
      const currentTime = new Date();
      onSendMessage({ text: message, time: currentTime });
      setMessage("");
    }
  };

  // Function to get initials from the group name
  const getInitials = (groupName) => {
    const words = groupName.split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase(); 
    } else {
      return (
        words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase()
      ); // First letters of the first two words
    }
  };

  if (!activeGroup) {
    return (
      <div className="RightMainbox">
        <img
          className="image"
          src="src/assets/Notes.png"
          alt="Pocket Notes Illustration"
          style={{
            width: "526px",
            height: "253px",
            display: "block",
            margin: "0 auto",
          }}
        />
        <h1 className="Pocketnotes">Pocket Notes</h1>
        <div className="description">
          <p>
            Send and receive messages without keeping your phone online.
            <br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
        </div>
        <div className="RightMainbox-footer">
          <div className="encryption-icon">
            <FiLock /> End-to-end encrypted
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="RightMainbox">
      <div className="sticky-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Group Icon */}
          <div
            style={{
              backgroundColor: activeGroup.color,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "10px",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {getInitials(activeGroup.name)}
          </div>
          {/* Group Name */}
          <h1>{activeGroup.name}</h1>
        </div>
      </div>
      <div className="messages" ref={messagesRef}>
        {activeGroup.messages.map((msg, index) => (
          <div key={index} className="message-box">
            <div className="message-content">{msg.text}</div>
            <small className="message-time">
              {new Date(msg.time).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your text here..."
          className="message-input"
          aria-label="Message Input"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="send-button"
          aria-label="Send Message"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default RightMainbox;
