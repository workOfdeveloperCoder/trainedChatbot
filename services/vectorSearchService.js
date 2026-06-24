const { getEmbedding } = require("./embeddingService");
const { searchVector } = require("../db/vectorStore");

async function searchDocs(query) {
  const vector = await getEmbedding(query);

  const results = await searchVector(vector);

  return results.map(r => r.payload.text);
}

module.exports = { searchDocs };