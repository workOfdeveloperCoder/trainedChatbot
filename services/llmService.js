const axios = require("axios");

async function generateResponse(prompt, res) {
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

    for await (const chunk of response.data) {
      const lines = chunk.toString().trim().split("\n");

      for (const line of lines) {
        const json = JSON.parse(line);

        if (json.response) {
          res.write(json.response);
        }
      }
    }

    res.end();

  } catch (error) {
    console.error("LLM Error:", error.message);
    res.status(500).end("AI service error");
  }
}

module.exports = { generateResponse };