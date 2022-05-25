import { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import { serverGetRecent, serverPostMessage, serverWakeUp } from "./ApiUtils";

export interface Message {
  time: number;
  text: string;
}

const getNow = () => {
  return new Date().getTime();
};

const App = () => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [curMessage, setCurMessage] = useState<string>("");
  const [now, setNow] = useState(getNow());

  const updateChatScroll = () => {
    let chatBox = document.getElementById("chat-box");
    if (chatBox !== null) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  };

  const updateMessages = async () => {
    let recentMessages = [];
    if (messages.length !== 0) {
      recentMessages = await serverGetRecent(messages[messages.length - 1]);
    } else {
      recentMessages = await serverGetRecent({ time: now, text: "" });
    }
    if (recentMessages.length !== 0) {
      setNow(getNow());
    }
    for (let msg of recentMessages) {
      messages.push(msg);
    }
    updateChatScroll();
  };

  useEffect(() => {
    updateMessages();
    const interval = setInterval(updateMessages, 100);
    return () => clearInterval(interval);
  }, [messages]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (curMessage.length === 0) {
      return;
    }

    setNow(getNow());
    serverPostMessage({ time: getNow(), text: curMessage });
    setCurMessage("");
  };

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCurMessage(event.target.value);
  };

  return (
    <div id="app">
      <h1 id="app-title">Global Chat</h1>
      <div id="chat-box">
        {messages.map((msg, index) => {
          return <p key={index}>{msg.text}</p>;
        })}
      </div>
      <form id="chat-input" onSubmit={handleSubmit}>
        <label>
          <input value={curMessage} onChange={handleMessageChange} />
        </label>

        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default App;
