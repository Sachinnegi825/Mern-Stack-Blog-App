# 📝 MERN Stack Blog App

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

A feature-rich, full-stack blogging application built using the MERN stack (MongoDB, Express.js, React, Node.js). This project provides a complete solution for creating, managing, and interacting with blog posts. It features a modern, responsive UI built with Tailwind CSS and Framer Motion, alongside a robust and secure backend.

---

## ✨ Features

### 🛡️ User Authentication & Authorization
- Secure User Registration and Login.
- JWT-based authentication with HTTP-only cookies.
- Password hashing using `bcryptjs`.
- Protected routes (only logged-in users can create, edit, or delete their posts).

### ✍️ Blog Management (CRUD)
- **Create**: Write new blog posts with rich content and featured images.
- **Read**: Browse all published posts, view individual posts in detail, and read comments.
- **Update**: Edit your existing posts.
- **Delete**: Remove your own posts.
- **My Posts**: A dedicated dashboard to manage your authored content.

### 🖼️ Media & Image Uploads
- Integrated with **Cloudinary** for scalable and fast image hosting.
- **Multer** middleware for handling multipart/form-data.

### 💬 Interactive Commenting System
- Users can leave comments on individual blog posts.

### 🎨 Modern UI/UX
- Responsive design crafted with **Tailwind CSS v4**.
- Smooth page transitions and animations using **Framer Motion**.
- Beautiful iconography with **Lucide React**.
- Toasts and notifications powered by **React Toastify**.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (via Vite)
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **State Management:** React Context API (`AuthContext`)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5
- **Database:** MongoDB via Mongoose
- **Authentication:** JSON Web Tokens (JWT) & Cookie Parser
- **Image Processing:** Multer & Cloudinary
- **Security:** CORS, Dotenv for environment variables

---

## 📂 Project Structure

```text
📦 Mern-Stack-Blog-App
 ┣ 📂 Backend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 controllers   # Logic for handling requests (posts, users)
 ┃ ┃ ┣ 📂 db            # Database connection setup
 ┃ ┃ ┣ 📂 middlewares   # JWT auth and Multer upload middlewares
 ┃ ┃ ┣ 📂 models        # Mongoose schemas (User, Post, Comment)
 ┃ ┃ ┣ 📂 routes        # Express API routes
 ┃ ┃ ┣ 📂 utils         # Error handling, API responses, Cloudinary config
 ┃ ┃ ┣ 📜 app.js        # Express app setup and middleware configuration
 ┃ ┃ ┗ 📜 index.js      # Entry point for the server
 ┃ ┗ 📜 .env.sample     # Sample environment variables for the backend
 ┃
 ┗ 📂 Frontend
   ┣ 📂 public          # Static assets
   ┣ 📂 src
   ┃ ┣ 📂 components    # Reusable UI elements (Header, Footer, PostCard, etc.)
   ┃ ┣ 📂 context       # Global state (AuthContext)
   ┃ ┣ 📂 pages         # Page views (Home, Login, Register, SinglePost, etc.)
   ┃ ┣ 📂 services      # API communication logic (Axios config)
   ┃ ┣ 📜 App.jsx       # Main application component & Routing
   ┃ ┗ 📜 main.jsx      # React entry point
   ┗ 📜 tailwind.config.js # Tailwind CSS configuration
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- [Git](https://git-scm.com/)
- A [Cloudinary](https://cloudinary.com/) account for image uploads.

### 1. Clone the Repository
```bash
git clone https://github.com/Sachinnegi825/Mern-Stack-Blog-App.git
cd Mern-Stack-Blog-App
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd Backend
npm install
```

**Environment Variables:**
Create a `.env` file in the `Backend` directory and add the following keys (refer to `.env.sample`):
```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_super_secret_access_token
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Start the Backend Server:**
```bash
npm run dev
```
*The server will start on `http://localhost:8000`.*

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd Frontend
npm install
```

**Start the Frontend Development Server:**
```bash
npm run dev
```
*The React app will be available at `http://localhost:5173`.*

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](../../issues) if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the ISC License. See `package.json` for more information.

---

<p align="center">
  Built with ❤️ by Sachin
</p>
