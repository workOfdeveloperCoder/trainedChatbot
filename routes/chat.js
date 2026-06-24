const express = require("express");
const router = express.Router();

const { generateResponse } = require("../services/llmService");
const { searchDocs } = require("../services/vectorSearchService");

router.post("/", async (req, res) => {
    
    const { message } = req.body;

    if (!req.session.history) {
        req.session.history = "";
    }
    
    const contextChunks = await searchDocs(message);

    const context = contextChunks.join("\n");

    const prompt = `
        You are a helpful AI assistant for a website.

        Previous Conversation:
        ${req.session.history}

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

    if (req.session.history.length > 20) {

        req.session.history = [
        req.session.history[0],
        ...req.session.history.slice(-19)
        ];

    }

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    await generateResponse(prompt, res, req, message);

});

module.exports = router;