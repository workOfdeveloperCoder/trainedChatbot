const express = require("express");
const chatRoutes = require("./routes/chat");

const app = express();

app.use(express.json());

// routes
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Chatbot server is running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});