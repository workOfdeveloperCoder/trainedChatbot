const express = require("express");
const router = express.Router();

const { generateResponse } = require("../services/llmService");
const { searchDocs } = require("../services/vectorSearchService");

router.post("/", async (req, res) => {
  const { message } = req.body;

  const contextChunks = await searchDocs(message);
  const context = contextChunks.join("\n");

 const prompt = `
        You are a helpful AI assistant for a website.

        Rules:
        - Use ONLY the context below
        - If answer is not in context, say "I don't know based on provided data"
        - Keep answers short and clear

        Context:
        ${context}

        User Question:
        ${message}

        Answer:
        `;

  const reply = await generateResponse(prompt);

  res.json({
    reply,
    contextUsed: contextChunks
  });
});

module.exports = router;