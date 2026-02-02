# Emotion-Aware Hybrid Verse App

A quiet, human, and intentional application that offers emotionally aligned verses and reflections based on how you feel.

## Purpose
To provide a moment of peace and grounding through AI-driven spiritual reflection. The app emphasizes simplicity, respect, and calm.

## Features
- **Emotional Reflection**: Input your feelings and receive an empathetic response.
- **Curated Verses**: AI selects verses (90% Bible, 10% other spiritual texts) that match your emotional state.
- **Privacy First**: No data is stored; interactions are ephemeral.
- **Minimalist Design**: No ads, no clutter, just reflection.

## Tech Stack
- **Frontend**: React (Vite), Plain CSS (Custom Design System).
- **Backend**: Node.js, Express.
- **AI**: OpenAI API (GPT-4o-mini).

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- OpenAI API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd ai-verse-app
    ```

2.  **Server Setup**
    ```bash
    cd server
    npm install
    # Create .env file
    cp .env.example .env
    # Add your OPENAI_API_KEY in .env
    ```

3.  **Client Setup**
    ```bash
    cd ../client
    npm install
    ```

## How to Run Locally

1.  **Start the Backend**
    ```bash
    cd server
    npm run dev  # or node index.js
    ```
    Server runs on `http://localhost:3000`.

2.  **Start the Frontend**
    ```bash
    cd client
    npm run dev
    ```
    Client runs on `http://localhost:5173`.

## Environment Variables

### Server (`/server/.env`)
```ini
OPENAI_API_KEY=sk-...
PORT=3000
```

### Client (`/client/.env` - optional)
```ini
VITE_API_URL=http://localhost:3000/api
```

## Ethical Note
This application uses Artificial Intelligence to generate responses. While designed to be empathetic and safe, it is **not a replacement for professional therapy, medical advice, or religious counsel**. In cases of crisis, please seek professional support.

---
*Built with intention.*
