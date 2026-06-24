const axios = require("axios");

// Using Ollama embeddings (FREE)
async function getEmbedding(text) {
  const response = await axios.post("http://localhost:11434/api/embeddings", {
    model: "nomic-embed-text",
    prompt: text
  });

  return response.data.embedding;
}

module.exports = { getEmbedding };