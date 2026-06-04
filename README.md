# Mini Social Post Application

A full-stack social feed web application replicating the look, feel, and functionality of the "Social" feed of the TaskPlanet mobile app. Built using **React.js, Node.js + Express, MongoDB, and Material UI (MUI)**.

## 🚀 Features

* **Account Creation**: Email/password registration and secure login.
* **Create Post**: Users can publish text posts, image posts, or both.
* **Public Social Feed**: Chronologically sorted posts from all users with scrollable categories ("All Post", "Most Liked", "Most Commented").
* **Likes & Comments**: Interactive like toggles and inline comments section with **optimistic UI updates** for instant responsiveness.
* **Responsive Layout**: Replicates mobile screen view container on desktop while scaling cleanly on mobile devices.

---

## 🛠️ Tech Stack

* **Frontend**: React.js, Vite, Material UI (MUI), Axios
* **Backend**: Node.js, Express, Mongoose, Multer (image upload storage)
* **Database**: MongoDB (Mongoose schemas)

---

## 📦 Local Setup Instructions

### 1. Database Setup
1. Ensure a local MongoDB instance is running at `mongodb://127.0.0.1:27017` or obtain a connection URI from MongoDB Atlas.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` folder and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_uri
   JWT_SECRET=any_random_secret_string
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

---

## 🌐 Production Deployment Guide

### 1. Database Deployment (MongoDB Atlas)
1. Set up a free cluster on MongoDB Atlas.
2. In the Network Access tab, set IP to `0.0.0.0/0` (allow connections from anywhere) so that your Render server can connect.
3. Keep your database connection string ready.

### 2. Backend Deployment (Render)
1. Go to [Render.com](https://render.com) and link your GitHub account.
2. Click **New +** and select **Web Service**.
3. Choose the `Social-Platform` repository.
4. Configure the settings:
   * **Name**: `social-platform-backend`
   * **Root Directory**: `backend`
   * **Language**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
5. Under the **Environment Variables** section, add:
   * `MONGO_URI`: `your_mongodb_atlas_connection_string` (remember to percent-encode `@` as `%40` in your password!)
   * `JWT_SECRET`: `your_jwt_signing_secret`
   * `NODE_ENV`: `production`
6. Click **Deploy Web Service** and copy your backend URL (e.g., `https://social-platform-backend.onrender.com`).

### 3. Frontend Deployment (Vercel)
1. Go to [Vercel.com](https://vercel.com) and log in using GitHub.
2. Click **Add New** -> **Project** and import the `Social-Platform` repository.
3. Configure the settings:
   * **Framework Preset**: `Vite`
   * **Root Directory**: `frontend`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
4. Expand the **Environment Variables** section and add:
   * `VITE_API_URL`: `https://social-platform-backend.onrender.com/api` (replace with your active Render backend API endpoint)
5. Click **Deploy**.
