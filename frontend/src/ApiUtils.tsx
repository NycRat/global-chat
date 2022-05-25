import axios from "axios";
import { Message } from "./App";

const serverURL = "http://localhost:5001";

export const serverPostMessage = async (message: Message) => {
  try {
    await axios.post(serverURL, { message: message });
  } catch (ex) {
    console.log("server error: " + ex);
  }
};

export const serverGetRecent = async (curRecent: Message) => {
  let recentMessages: Array<Message> = [];
  try {
    await axios
      .get(serverURL, { params: { curRecent: curRecent } })
      .then((res) => {
        recentMessages = res.data["messages"];
      });
  } catch (ex) {
    console.log("server error: " + ex);
  }
  return recentMessages;
};
