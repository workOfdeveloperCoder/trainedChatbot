const express = require("express");
const router = express.Router();

const { generateResponse } = require("../services/llmService");
const { searchDocs } = require("../services/vectorSearchService");

router.post("/", async (req, res) => {
    
    const { message } = req.body;

    if (!req.session.history) {
        req.session.history = [];
    }
    
    const contextChunks = await searchDocs(message);

    const context = contextChunks.join("\n");

    const historyText = req.session.history
        .map(h => `${h.role}: ${h.content}`)
        .join("\n");

    const prompt = `
        === ROLE ===
        You are an AI assistant for this website.

        === FACTS ===
        ${context}

        === CONVERSATION HISTORY ===
        ${historyText}

        === USER QUESTION ===
        ${message}

        === RULES ===
        - Use FACTS as the source of truth.
        - Use CONVERSATION HISTORY only to understand references like "this", "it", "that", "they", etc.
        - Do NOT explain your reasoning.
        - Do NOT mention "conversation history", "previous answer", or "previous message".
        - Answer directly.
        - Keep responses under 30 words whenever possible.
        - Do not provide introductions.
        - Do not explain how you found the answer.
        - Do not mention previous messages.
        - If the answer is not in FACTS, reply exactly:
        "I don't know based on the provided information."

        === ANSWER ===
    `;

    if (req.session.history.length > 20) {
        req.session.history = req.session.history.slice(-20);
    }

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    await generateResponse(prompt, res, req, message);

});

module.exports = router;