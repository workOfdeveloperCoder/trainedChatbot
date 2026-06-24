const axios = require("axios");

async function generateResponse(prompt) {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt: prompt,
      stream: false
    });

    return response.data.response;
  } catch (error) {
    console.error("LLM Error:", error.message);
    return "AI service error";
  }
}

module.exports = { generateResponse };