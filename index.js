const fs = require("fs");

const { indexDocs } = require("./services/indexDocs");

async function run() {
  try {
    console.log("🚀 Starting indexing...");

    await indexDocs();

    console.log("Indexing completed successfully");
  } catch (err) {
    console.error("Indexing failed:", err.message);
  }
}

run();