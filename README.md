# Local RAG Chatbot with Ollama

A Retrieval-Augmented Generation (RAG) chatbot built with Node.js, Express, Ollama, and session-based conversation history.

## Features

- Local LLM using Ollama
- Streaming responses
- Document-based RAG search
- Session-based chat history
- Express API
- Simple HTML frontend
- Context-aware follow-up questions

---

## Tech Stack

- Node.js
- Express.js
- Ollama (Llama 3)
- Axios
- Express Session

---

## Project Structure

```text
project/
│
├── public/
│   └── index.html
│
├── routes/
│   ├── chat.js
│   └── system.js
│
├── services/
│   ├── llmService.js
│   └── vectorSearchService.js
│
├── documents/
│
├── server.js
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd project
```

### Install Dependencies

```bash
npm install
```

### Install Required Packages

```bash
npm install express axios express-session cors
```

---

## Install Ollama

Download and install Ollama:

https://ollama.com

Pull Llama 3 model:

```bash
ollama pull llama3
```

Start Ollama:

```bash
ollama serve
```

Verify Ollama:

```bash
curl http://localhost:11434/api/tags
```

---

## Run Application

```bash
node server.js
```

Application URL:

```text
http://localhost:3000
```

---

## API Endpoints

### Chat Endpoint

```http
POST /api/chat
```

Request:

```json
{
  "message": "What services do you provide?"
}
```

---

### Reset Conversation History

```http
GET /reset
```

Response:

```json
{
  "success": true,
  "message": "History cleared"
}
```

---

## RAG Workflow

```text
User Question
      ↓
Document Search
      ↓
Relevant Context
      ↓
Prompt Construction
      ↓
Ollama (Llama 3)
      ↓
Streaming Response
      ↓
Browser
```

---

## Conversation Memory

The chatbot stores conversation history using Express Session.

Example:

```text
User: What is the support email?
Assistant: support@yourwebsite.com

User: Can you repeat it?
Assistant: support@yourwebsite.com
```

This enables follow-up questions while keeping responses grounded in document context.

---

## Future Improvements

- Embeddings
- Qdrant Vector Database
- Semantic Search
- LangChain Integration
- Redis Session Storage
- Multi-user Support
- Authentication
- Agent Workflows
- Tool Calling

---

## License

MIT