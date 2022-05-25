import { useEffect, useRef } from "react";
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

  const recentMessage = useRef<Message>({ text: "", time: getNow() });

  const updateChatScroll = () => {
    let chatBox = document.getElementById("chat-box");
    if (chatBox !== null) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  };

  const updateMessages = async () => {
    let recentMessages = [];
    recentMessages = await serverGetRecent(recentMessage.current);
    if (recentMessages.length !== 0) {
      let updatedMessages = [...messages];
      for (let i = recentMessages.length - 1; i >= 0; i--) {
        updatedMessages.push(recentMessages[i]);
      }
      setMessages(updatedMessages);
      recentMessage.current = updatedMessages[updatedMessages.length - 1];
      updateChatScroll();
    }
  };

  useEffect(() => {
    const interval = setInterval(updateMessages, 100);
    return () => clearInterval(interval);
  }, [messages]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (curMessage.length === 0) {
      return;
    }

    recentMessage.current = { time: getNow(), text: curMessage };
    serverPostMessage(recentMessage.current);

    let newMessages = [...messages];
    newMessages.push(recentMessage.current);
    setMessages(newMessages);
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
