import { ChangeEvent, FormEvent, useState } from "react";

const App = () => {
  const [chatMessages, setChatMessages] = useState<Array<String>>(["woah"]);

  const [curMessage, setCurMessage] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let newMessages = [...chatMessages];
    newMessages.push(curMessage);
    setChatMessages(newMessages);
    setCurMessage("");
  };

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCurMessage(event.target.value);
  };

  return (
    <div className="app">
      <h1 className="app-title">Global Chat</h1>
      <div className="chat-box">
        {chatMessages.map((msg, index) => {
          return <p key={index}>{msg}</p>;
        })}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            value={curMessage}
            onChange={handleMessageChange}
          />
        </label>

        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default App;
