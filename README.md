# Krishi Sakhi AgriAI — Server

Node.js + Express backend for **Krishi Sakhi AgriAI**, an integrated AI-powered farming assistant for Kerala's smallholder farmers.  
This server handles API requests, authentication, AI orchestration, model inference, pest detection verification, community sync, and data aggregation.  

## Features
- **Chatbot API**: Routes queries to Hugging Face LLM for Malayalam advisories.  
- **Pest Detection API**: Accepts crop images, verifies results using cloud CV models.  
- **Federated Sync**: Handles privacy-preserving updates and model aggregation.  
- **Data Layer**: Interfaces with PostgreSQL/Firebase for users, pest knowledge, and time-series data.  
- **Scalable Architecture**: Supports Redis queues, background workers, and secure endpoints.

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/krishi-sakhi-server.git
cd krishi-sakhi-server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run server
```bash
npm run start
```
