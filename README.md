# Project Assignment and Progress Tracking System 🎓

## Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Setup Instructions](#setup-instructions)
5. [API Documentation](#api-documentation)
6. [Screenshots](#screenshots)
7. [Deployment Links](#deployment-links)

---

## Overview

This is a **Minimal Viable Product (MVP)** for an **Ed-Tech Platform**. The system allows project managers to assign projects to candidates, track their progress, and calculate scores dynamically based on task completion.

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios  
- **Backend**: Node.js, Express.js, MongoDB  
- **Tools**: Postman, Toastify, Mongoose  

---

## Features

### 1. **Project Assignment Module**
   - Assign projects to candidates.
   - View a list of assigned projects.

### 2. **Progress Tracking and Scoring**
   - Update candidate progress dynamically (0-100%).
   - Auto-calculate scores based on progress (Progress * 10).
   - Display progress visually using dynamic progress bars.

### 3. **Interactive Frontend**
   - Toast notifications for actions.
   - Clean and responsive UI with Tailwind CSS.

### 4. **Dynamic Data Storage**
   - MongoDB for real-time data management.

---

## Setup Instructions

### Prerequisites:
- Node.js installed on your machine.
- MongoDB connection string.

### 1. Clone the Repository
```bash
git clone <repository-link>
cd project-assignment-system
```

### 2. Backend Setup
- Go to the backend folder:
```bash
cd backend
```
- Install dependencies:
```bash
npm install
```
- Create a `.env` file and add the following:
```env
MONGODB_URI=<Your MongoDB URI>
PORT=6002
```
- Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
- Go to the frontend folder:
```bash
cd frontend
```
- Install dependencies:
```bash
npm install
```
- Start the React development server:
```bash
npm start
```

### 4. Test the Application
- Open the frontend in your browser:
```bash
http://localhost:3000
```
- Backend runs at:
```bash
http://localhost:6002/api
```

---

## API Documentation

### Base URL: `http://localhost:6002/api`

### 1. **Get All Candidates**
- **Endpoint**: `GET /candidates`  
- **Description**: Fetches all candidate details.

### 2. **Add a Candidate**
- **Endpoint**: `POST /candidates`  
- **Request Body**:
   ```json
   {
     "name": "Test User",
     "email": "testuser@example.com",
     "skills": ["React", "Node.js"]
   }
   ```

### 3. **Get All Projects**
- **Endpoint**: `GET /projects`  
- **Description**: Fetches all projects.

### 4. **Assign a Project**
- **Endpoint**: `POST /assignments`  
- **Request Body**:
   ```json
   {
     "candidate": "<candidate_id>",
     "project": "<project_id>"
   }
   ```

### 5. **Update Progress**
- **Endpoint**: `PUT /assignments/:id/progress`  
- **Request Body**:
   ```json
   {
     "progress": 70
   }
   ```

---

## Screenshots

1. **Project Assignment Interface**  
   ![Project Assignment](link-to-screenshot)

2. **Progress Tracking**  
   ![Progress Tracking](link-to-screenshot)

3. **API Testing with Postman**  
   ![Postman API](link-to-screenshot)

---

## Deployment Links

- **Frontend**: [Deployed Link Here](https://assignment-management-tool.vercel.app/)  
- **Backend**: [Backend API](https://assignment-management-tool.onrender.com/api)

---

## Future Improvements
- Role-Based Access Control (Admin, Mentor, Candidate).  
- Real-time updates with WebSockets.  
- Advanced analytics dashboard.  
- Export data as Excel/PDF.  

---