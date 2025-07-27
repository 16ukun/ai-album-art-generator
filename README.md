# Audio to Album Cover Generator - Using AI

This project takes an audio file (e.g., a music sample), analyzes its mood and characteristics using a Python-based analyzer, generates a creative prompt using Together.ai (LLaMA 3), and finally produces an AI-generated album cover using Hugging Face's Stable Diffusion.

---

## Features

- Upload an audio file (e.g., MP3).
- Audio is analyzed for key, mood, BPM, energy, and genre via Flask.
- Prompt is generated via Together.ai's LLaMA 3 model.
- Image is generated using Hugging Face's Stable Diffusion.
- Final image is saved to a shared local folder.
- Built with NestJS + Flask + Docker Compose.

---

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js (for development without Docker)
- Hugging Face API Token (`HUGGING_FACE_API_TOKEN`)
- Together.ai API Key (`TOGETHER_API_KEY`)

---

### Installation

**Clone the repo:**

```
git clone
cd audio-album-art-generator
```

**Create .env file in the backend directory**

# backend/.env

```
HF_API_TOKEN=your_huggingface_token
TOGETHER_API_KEY=your_together_api_key
```

**Build and start the app with Docker Compose**

```
docker compose up --build
```

**Example usage**

```
curl -X POST http://localhost:3000/audio/analyze -F "file=@./Test_file/sample-12s.mp3"
```

Project structure:

```
.
├── backend/
│   ├── src/
│   │   ├── modules/audio/
│   │   │   ├── audio.controller.ts
│   │   │   ├── audio.service.ts
│   │   ├── image/
│   │   │   ├── image.module.ts
│   │   │   ├── image.service.ts
│   │   ├── prompt-engine/
│   │   │   └── prompt-engine-service.ts
│   └── .env
├── analyzer/
│   └── app.py
├── images/                <-- Generated images saved here
└── docker-compose.yml
```
