const axios = require("axios");

const QDRANT_URL = "http://localhost:6333";
const COLLECTION = "chatbot";

async function createCollection(vectorSize = 768) {
  try {
    await axios.put(`${QDRANT_URL}/collections/${COLLECTION}`, {
      vectors: {
        size: vectorSize,
        distance: "Cosine"
      }
    });
  } catch (err) {
    // ignore if exists
  }
}

async function upsertVector(id, vector, payload) {
  await axios.put(`${QDRANT_URL}/collections/${COLLECTION}/points`, {
    points: [
      {
        id,
        vector,
        payload
      }
    ]
  });
}

async function searchVector(vector) {
  const res = await axios.post(
    `${QDRANT_URL}/collections/${COLLECTION}/points/search`,
    {
      vector,
      limit: 3,
      with_payload: true
    }
  );

  return res.data.result;
}

module.exports = {
  createCollection,
  upsertVector,
  searchVector
};