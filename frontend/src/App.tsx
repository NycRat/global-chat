import { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";

const App = () => {
  const [messages, setMessages] = useState<Array<String>>([]);

  const [curMessage, setCurMessage] = useState<string>("");

  const handleNewMessage = () => {
    let chatBox = document.getElementById("chat-box");
    if (chatBox !== null) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let newMessages = [...messages];
    newMessages.push(curMessage);
    setMessages(newMessages);
    setCurMessage("");
    handleNewMessage();
  };

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCurMessage(event.target.value);
  };

  useEffect(() => {
    handleNewMessage();
  }, [messages]);

  return (
    <div id="app">
      <h1 id="app-title">Global Chat</h1>
      <div id="chat-box">
        {messages.map((msg, index) => {
          return <p key={index}>{msg}</p>;
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
