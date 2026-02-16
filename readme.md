# 🎓 AI Dropout Predictor & Counselling System

An AI-powered web application designed to **identify students at risk of dropping out** and provide **timely academic and emotional support** through dashboards, AI mentorship, and counselling workflows.

This system bridges **data-driven insights** with **human intervention**, helping institutions take preventive action instead of reactive measures.


---

##  Project Overview

Student dropout is often the result of unnoticed academic decline, stress, or lack of timely guidance.  
This project uses **Machine Learning predictions**, **role-based dashboards**, and **communication tools** to:

- Identify high-risk students early
- Provide students with supportive insights
- Enable admins/counsellors to intervene effectively

The application supports **two major roles**:

- **Admin** – Data upload, risk analysis, communication & scheduling
- **Student** – Personal dashboard, AI mentor, counselling access

---

##  Key Features

### 👨‍🎓 Student Features
- Personalized **dropout risk dashboard**
- Semester-wise academic performance view
- AI Mentor (Gemini API) for:
  - Stress support
  - Study guidance
  - Motivation
- Contact assigned counsellor directly
- Supportive, non-judgmental UI
- Can signUp only after admin upload Data through CSV

### 👩‍💼 Admin Features
- Upload student data via CSV
- View all students with risk classification (Low / Medium / High)
- Contact students directly via email
- Schedule counselling appointments
- Secure role-based access
- Only can be signed up through Backend so that misuse and filling database is not possible 

---

##  Architecture

Frontend (Next.js)
↓
Backend (Express + TypeScript + MONGODB)
↓
ML Service (FastAPI + ML Model)
↓
MongoDB

markdown
Copy code

- **Frontend** communicates only with backend
- **Backend** acts as the central orchestrator
- **ML service** is fully decoupled
- Clean separation of concerns

---

##  Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- MagicUI (animations)
- Axios
- Lottie

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer
- Role-based authorization
- Google smtp

### AI / ML
- Gemini API (AI Mentor)
- Python ML model (FastAPI service)
- CSV-based prediction pipeline

---

##  Authentication & Roles

- JWT-based authentication (HTTP-only cookies)
- Role-based access:
  - **ADMIN**
  - **STUDENT**
- Protected routes on both frontend & backend

---

##  Repository Structure

dropout-predictor/
├── client/ # Frontend (Next.js)
├── server/ # Backend (Express + TS)
├── ml-service/ # ML API (FastAPI)
└── README.md # This file

yaml
Copy code

Each folder contains its own setup instructions.

---

## Current Capabilities

✔ CSV upload & ML predictions
✔ Risk classification & dashboards
✔ AI Mentor chatbot
✔ Admin ↔ Student communication
✔ Appointment scheduling
✔ Clean error handling
✔ Scalable architecture

## Future Improvements

Analytics dashboard for admin

Student performance trends over time

Notifications for high-risk students

Multi-counsellor assignment

Deployment (Docker / Cloud)

## Why This Project Matters

This is not just a CRUD app.
It demonstrates:

Real-world problem solving

Clean backend architecture

AI integration in a meaningful context

Thoughtful UX for sensitive data

Industry-style code organization

---

# Author

Harsh Tiwari
Full-Stack Developer (MERN / Next.js / TypeScript)
IIITU