const express = require("express");
const chatRoutes = require("./routes/chat");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/api/chat", chatRoutes);


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});