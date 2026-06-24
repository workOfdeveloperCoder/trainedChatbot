const express = require("express");
const chatRoutes = require("./routes/chat");
const systemRoutes = require("./routes/system");
const path = require("path");
const session = require("express-session");

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "yasir-rag-chatbot-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/reset", systemRoutes);

app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/api/chat", chatRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});