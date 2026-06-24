const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const { getEmbedding } = require("./embeddingService");
const { upsertVector, createCollection } = require("../db/vectorStore");

function splitText(text, size = 100) {
  const words = text.split(" ");
  const chunks = [];

  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(" "));
  }

  return chunks;
}

async function indexDocs() {
  await createCollection();

  const text = fs.readFileSync("./data/docs.txt", "utf8");

  const chunks = splitText(text, 80);

  for (const chunk of chunks) {
    if (!chunk.trim()) continue;

    try {
      const vector = await getEmbedding(chunk);

      await upsertVector(uuidv4(), vector, {
        text: chunk
      });

      console.log("Indexed:", chunk.slice(0, 50));
    } catch (err) {
      console.log("Skipping chunk (error):", err.message);
    }
  }

  console.log("DONE indexing");
}

module.exports = { indexDocs };