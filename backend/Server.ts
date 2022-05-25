import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const port = 5001;

export interface Message {
  time: string;
  text: string;
}

const messages: Array<Message> = [];

const updateMessages = () => {
  if (messages.length > 50) {
    messages.splice(0, messages.length - 50);
  }
};

app.get("/", (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "application/json");
    if (typeof req.query["curRecent"] === "string") {
      let curRecent = JSON.parse(req.query["curRecent"]);
      let moreRecent = false;

      let moreRecentMessages: Array<Message> = [];
      for (let i = messages.length - 1; i > 0; i--) {
        if (parseInt(messages[i].time) <= curRecent["time"]) {
          break;
        }
        moreRecentMessages.push(messages[i]);
        moreRecent = true;
      }

      res.json({ hasMoreRecent: moreRecent, messages: moreRecentMessages });
    } else {
      res.status(404).json({ error: "invalid request" });
    }
  } catch (ex) {
    res.status(404).json({ error: "invalid request" });
  }
});

app.post("/", (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "application/json");
    messages.push(req.body["message"]);
    res.json({ success: true });
  } catch (ex) {
    res.status(404).json({ error: "invalid request" });
  }
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
