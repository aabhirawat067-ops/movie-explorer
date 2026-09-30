# 🎬 Movie Explorer

<p align="center">
  <strong>Discover. Search. Explore. Save your favorite movies.</strong>
</p>

<p align="center">
  A modern full-stack movie discovery platform built with React, Vite, Node.js and Express.
</p>

<p align="center">
  <a href="https://aabhirawat067-ops.github.io/movie-explorer/">
    🌐 Live Demo
  </a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://github.com/aabhirawat067-ops/movie-explorer">
    💻 Source Code
  </a>
</p>

---

## ✨ Overview

**Movie Explorer** is a responsive movie discovery application that allows users to explore trending, popular and upcoming movies, search for movies, filter them by genre and view detailed movie information.

The application uses a **React + Vite frontend** with a **Node.js + Express backend**, while movie data is powered by the **TMDB API**.

The backend acts as a secure API layer so the TMDB API key is not exposed directly in the frontend.

---

## 🚀 Features

### 🎥 Movie Discovery
- 🔥 Trending movies
- ⭐ Popular movies
- 📅 Upcoming movies
- 🎬 Movie details
- ⭐ Movie ratings
- 📆 Release years

### 🔎 Search & Filtering
- 🔍 Movie search
- 🎭 Genre filtering
- ⚡ Debounced search
- 📱 Responsive search experience

### ❤️ Favorites
- Add movies to favorites
- Remove movies from favorites
- Favorites counter
- Persistent favorite selection

### 🎨 User Experience
- 📱 Mobile responsive design
- 💻 Desktop optimized interface
- ⏳ Loading states
- ⚠️ Error handling
- 🖼️ Movie poster previews
- 🎯 Clean modern UI

---

## 🛠️ Tech Stack

### Frontend

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
</p>

### Backend

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
</p>

### API & Deployment

<p>
  <img src="https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" />
</p>

---

## 🏗️ Project Architecture

```text
Movie Explorer
│
├── Frontend
│   ├── React
│   ├── Vite
│   └── Responsive UI
│
├── Backend
│   ├── Node.js
│   ├── Express
│   └── TMDB API Proxy
│
└── Deployment
    ├── Frontend → GitHub Pages
    └── Backend → Render
