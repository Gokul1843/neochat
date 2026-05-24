
import EmojiPicker from "emoji-picker-react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [joined, setJoined] = useState(false);
  
  const [showEmoji, setShowEmoji] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState(null);
  
const [selectedUser, setSelectedUser] =
  useState("Aarav");

  const [messages, setMessages] = useState([
    {
      text: "Welcome to NeoChat 🚀",
      me: false,
    },
  ]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleAuth = () => {
    if (username && password) {
      setLoggedIn(true);
    } else {
      alert("Fill all fields");
    }
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    const messageData = {
      text: message,
      me: true,
      username: username,
    };

    setMessages((prev) => [...prev, messageData]);

    socket.emit("send_message", {
      ...messageData,
      me: false,
    });

    setMessage("");
  };

  if (loggedIn) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          background: "#020617",
          color: "white",
          fontFamily: "Arial",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: "320px",
            background: "#081028",
            padding: "20px",
            borderRight: "1px solid #1e293b",
            overflowY: "auto",
          }}
        >
          <h1
            style={{
              color: "cyan",
              fontSize: "45px",
            }}
          >
            NeoChat 🚀
          </h1>

          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <img
              src={
                profilePhoto
                  ? URL.createObjectURL(profilePhoto)
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <br />
            <br />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProfilePhoto(e.target.files[0])
              }
            />
          </div>

          <div
            style={{
              marginTop: "30px",
              background: "cyan",
              padding: "20px",
              borderRadius: "20px",
              color: "black",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <img
              src={
                profilePhoto
                  ? URL.createObjectURL(profilePhoto)
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <div>
              <h2>{username}</h2>
              <p style={{ color: "green" }}>
                Online 🟢
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              background: "#1e293b",
              padding: "20px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="user"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
              }}
            />

            <div>
              <h2>Aarav</h2>
              <p style={{ color: "lime" }}>
                Online 🟢
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              background: "#1e293b",
              padding: "20px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="user"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
              }}
            />

            <div>
              <h2>Emily</h2>
              <p style={{ color: "gray" }}>
                Offline ⚫
              </p>
            </div>
          </div>

          <button
            onClick={() => setLoggedIn(false)}
            style={{
              width: "100%",
              marginTop: "30px",
              padding: "18px",
              border: "none",
              borderRadius: "15px",
              background: "cyan",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            Logout
          </button>
        </div>

        {/* Chat Area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid #1e293b",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <img
              src={
                profilePhoto
                  ? URL.createObjectURL(profilePhoto)
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
              }}
            />

            <div>
              <h2>{username}</h2>
              <p style={{ color: "lime" }}>
                Online 🟢
              </p>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: msg.me
                    ? "flex-end"
                    : "flex-start",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    background: msg.me
                      ? "cyan"
                      : "#1e293b",
                    color: msg.me
                      ? "black"
                      : "white",
                    padding: "15px",
                    borderRadius: "20px",
                    maxWidth: "300px",
                    boxShadow: msg.me
                      ? "0 0 10px cyan"
                      : "none",
                  }}
                >
                  {!msg.me && (
                    <strong>
                      {msg.username}
                      <br />
                    </strong>
                  )}

                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Input */}
          <div
            style={{
              padding: "20px",
              borderTop: "1px solid #1e293b",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={() =>
                setShowEmoji(!showEmoji)
              }
              style={{
                padding: "15px",
                borderRadius: "15px",
                border: "none",
                background: "#1e293b",
                color: "white",
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              😀
            </button>

            {showEmoji && (
              <div
                style={{
                  position: "absolute",
                  bottom: "90px",
                }}
              >
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                />
              </div>
            )}

            <input
              type="text"
              placeholder="Type message..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              style={{
                flex: 1,
                padding: "18px",
                borderRadius: "15px",
                border: "none",
                outline: "none",
                background: "#1e293b",
                color: "white",
                fontSize: "16px",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                padding: "18px 30px",
                border: "none",
                borderRadius: "15px",
                background: "cyan",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#020617",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "350px",
          background: "#111827",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 0 20px cyan",
          color: "white",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "cyan",
            fontSize: "45px",
          }}
        >
          NeoChat 🚀
        </h1>

        <h2 style={{ textAlign: "center" }}>
          {isLogin ? "Login" : "Signup"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "20px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "15px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <button
          onClick={handleAuth}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "20px",
            border: "none",
            borderRadius: "10px",
            background: "cyan",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          onClick={() =>
            setIsLogin(!isLogin)
          }
          style={{
            textAlign: "center",
            marginTop: "20px",
            cursor: "pointer",
            color: "cyan",
          }}
        >
          {isLogin
            ? "Create new account"
            : "Already have account?"}
        </p>
      </div>
    </div>
  );
}

export default App
