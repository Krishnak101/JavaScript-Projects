# 🎬 CineVerse

**CineVerse** is a React.js-based movie discovery web app that fetches real-time data from a public movie API.  
It allows users to explore trending, top-rated, and upcoming movies — all in an elegant and responsive UI.

🌐 **Live Demo:** [cineverse-kunatibala.netlify.app](https://cineverse-kunatibala.netlify.app/)

---

## 🚀 Features

- 🎥 Browse movies based on categories: **Popular**, **Top Rated**, and **Upcoming**
- 🔍 Filter movies by ratings (8+ Star, 7+ Star, etc.)
- ⚡ Sort movies dynamically (Ascending / Descending order)
- 🧭 Client-side routing with React Router — fast and seamless navigation
- 🎨 Responsive design with clean CSS styling
- 🔄 Real-time data loading using API fetch and `useEffect` hook

---

## 🧩 Tech Stack

- **Frontend:** React.js (Vite)
- **Styling:** CSS
- **Routing:** React Router DOM
- **Sorting:** Lodash
- **API Handling:** Fetch + useEffect Hook
- **State Management:** useState Hook
- **Deployment:** Netlify

---

## 🧠 Learning Highlights

This project was built to strengthen understanding of:

- React fundamentals (components, props, state)
- API integration and asynchronous data fetching
- Hooks (`useState`, `useEffect`)
- Debugging React apps efficiently
- Building user-friendly and visually consistent UIs

---

## ⚙️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Krishnak101/JavaScript-Projects.git
   cd JavaScript-Projects/React-Projects/cineverse
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create an Environment File**

   To use your TMDB API, create a **.env** file in the project root (same level as vite.config.js) and add your own API key like this:

   ```bash
   VITE_API_KEY=your_tmdb_api_key_here
   ```

4. **Start the developement server**

   ```bash
   npm run dev
   ```

5. **Open your browser and visit:**
   ```arduino
   http://localhost:5173
   ```

---

## 🤝 Acknowledgments

- API Source: [TMDB API](https://www.themoviedb.org/documentation/api)
- Deployed using [Netlify](https://www.netlify.com/)
