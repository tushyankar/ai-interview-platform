# ai-interview-platform
# INTERVIEWED | Advanced AI-Powered Mock Interview Workspace

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A full-stack, AI-driven interview preparation platform designed to generate rigorous, highly personalized mock interview loops based on a candidate's specific resume and desired role. 

## 📖 The Vision & Problem Statement

There is a significant disconnect between standard academic curricula and the highly specific, rigorous demands of modern tech industry interviews. Generic interview prep tools often provide "one-size-fits-all" questions that fail to test a candidate's actual depth of experience.

**Interviewed** solves this by treating the candidate's resume as the primary context engine. By leveraging localized Large Language Models (LLMs), the platform analyzes the user's exact tech stack, past projects, and experience level to generate dynamic, challenging, and hyper-relevant technical and behavioral questions.

## 🏗️ System Architecture

The application is built on a decoupled, modern architecture:
* **Client Layer:** A Vite-powered React Single Page Application (SPA) utilizing a modern, high-contrast brutalist design language for a premium user experience. State is managed locally, and routing is handled via `react-router-dom`.
* **API Gateway / Backend:** A Node.js/Express RESTful API handling business logic, multipart file parsing, and stateless authentication via JSON Web Tokens (JWT).
* **Data Persistence:** A containerized PostgreSQL database managing user states, parsed resume context, and generated interview logs. 
* **AI Inference Engine:** A localized implementation of the Llama 3 model (via Ollama), ensuring zero-cost scaling and complete data privacy for user resumes by keeping all AI generation on-device.

## ✨ Core Features

* **Intelligent Resume Parsing:** Utilizes server-side memory buffers and `pdf-parse` to extract unstructured text from uploaded resumes and securely inject it into the relational database.
* **Localized AI Integration:** Bypasses expensive cloud APIs by querying a local Ollama instance (`127.0.0.1:11434`), demonstrating an understanding of cost-effective, privacy-first AI deployment.
* **Stateless Authentication:** Secure user registration and login workflows utilizing `bcryptjs` for password hashing and short-lived JWTs for secure session management.
* **Editorial UI/UX:** A fully responsive, pixel-perfect frontend built with Tailwind CSS, focusing on minimal aesthetics, geometric typography (Montserrat), and stark visual hierarchies.

## 🛠️ Complete Tech Stack

| Category | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS v3, Axios, React Router, Lucide Icons |
| **Backend** | Node.js, Express.js, JSON Web Tokens (JWT), Bcrypt, Multer, PDF-Parse |
| **Database** | PostgreSQL 15, Redis (Caching Layer), `pg` (Node Postgres) |
| **Infrastructure** | Docker, Docker Compose, Linux (Ubuntu) |
| **Artificial Intelligence** | Llama 3 (8B Parameter Model), Ollama Local API |

---

## 🚀 Local Setup & Installation

### Prerequisites
* Node.js (v18+)
* Docker Desktop / Docker Compose
* [Ollama](https://ollama.com/) (For local LLM hosting)

### 1. Clone the Repository
bash
git clone [https://github.com/yourusername/ai-interview-platform.git](https://github.com/yourusername/ai-interview-platform.git)
cd ai-interview-platform

2. Boot up Infrastructure

Start the PostgreSQL and Redis containers in detached mode:
Bash

docker-compose up -d

3. Initialize Local AI Engine

Ensure Ollama is running on your machine and pull the required model. This model runs locally, ensuring user resume data is never sent to third-party servers.
Bash

ollama run llama3

4. Configure Environment Variables

Navigate to the server directory and create a .env file:
Code snippet

PORT=5001
DB_USER=ai_user
DB_PASSWORD=ai_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=interview_db
JWT_SECRET=generate_a_secure_random_string_here

5. Start the Application

You will need two terminal instances to run the client and server concurrently.

Terminal 1 (Backend):
Bash

cd server
npm install
npm run dev

Terminal 2 (Frontend):
Bash

cd client
npm install
npm run dev

The application will be accessible at http://localhost:5173.
📈 Future Roadmap

    WebRTC Integration: Enable browser-based video/audio recording to simulate real interview environments.

    Speech-to-Text Analytics: Pass recorded user audio to a Whisper model for transcription and filler-word analysis.

    Quantitative Feedback Matrix: Have the AI evaluate transcribed answers against the generated questions to provide an automated score (1-10) and actionable feedback.

    Cloud Deployment: Containerize the Node.js and React applications for deployment via AWS ECS or Vercel/Render.

Designed and engineered by Tushyankar Padhi
