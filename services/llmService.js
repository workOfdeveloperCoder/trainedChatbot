const axios = require("axios");

async function generateResponse(prompt, res, req, userMessage) {
  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt,
        stream: true
      },
      {
        responseType: "stream"
      }
    );

    let assistantReply = "";

    for await (const chunk of response.data) {

      const lines = chunk.toString().split("\n");

      for (const line of lines) {

        if (!line.trim()) continue;

        const json = JSON.parse(line);

        if (json.response) {

            assistantReply += json.response;

            res.write(json.response);
          }
        }
    }

    req.session.history += `
      User: ${userMessage}
      Assistant: ${assistantReply}
    `;
    
    const lines = req.session.history.split("\n").filter(Boolean);

    if (lines.length > 40) {
      req.session.history = lines.slice(-40).join("\n");
    }
    res.end();
    

  } catch (error) {
    console.error("LLM Error:", error.message);
    res.status(500).end("AI service error");
  }
}

module.exports = { generateResponse };