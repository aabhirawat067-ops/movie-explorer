# 🎬 Movie Explorer

A modern full-stack movie discovery web application built with **React, Vite, Node.js, Express, and TMDB API**.

Explore trending, popular, and upcoming movies, search for movies, filter by genre, view detailed information, and save your favorite movies.

## 🚀 Live Demo

🔗 **[Live Demo](https://aabhirawat067-ops.github.io/movie-explorer/)**

## 🔗 Project Links

* **Frontend:** [GitHub Repository](https://github.com/aabhirawat067-ops/movie-explorer)
* **Backend:** [GitHub Repository](https://github.com/aabhirawat067-ops/Movie-backend-)


---

## ✨ Features

* 🎬 Trending movies
* 🔥 Popular movies
* 📅 Upcoming movies
* 🔍 Movie search
* 🎭 Genre-based filtering
* ❤️ Add movies to favorites
* 🎞️ Movie details
* 📱 Responsive design
* ⚡ Fast Vite development environment
* 🔐 TMDB API key protected on the backend
* 🌐 Separate frontend and backend architecture

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS
* GitHub Pages

### Backend

* Node.js
* Express.js
* CORS
* dotenv

### API

* TMDB API

### Deployment

* Frontend → GitHub Pages
* Backend → Render

---

## 🏗️ Project Architecture

```text
User
  │
  ▼
React + Vite Frontend
  │
  │ API Requests
  ▼
Node.js + Express Backend
  │
  │ TMDB API Request
  ▼
TMDB API
  │
  ▼
Movie Data
  │
  ▼
Frontend
```



Instead, requests are sent to the Express backend, which communicates with TMDB and returns the movie data to the frontend.

---




## 📂 Project Structure

### Frontend

```text
movie-explorer/
└── temp-react/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── ...
    ├── public/
    ├── package.json
    ├── vite.config.js
    └── ...
```

### Backend

```text
Movie-backend-/
├── server.js
├── package.json
├── .env
├── .gitignore
└── README.md
```







