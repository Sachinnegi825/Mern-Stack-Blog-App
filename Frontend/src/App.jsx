import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SinglePost from './pages/SinglePost';
import CreatePost from './pages/CreatePost';
import AllPosts from './pages/AllPosts';
import EditPost from './pages/EditPost';
import MyPosts from './pages/MyPosts';
import ScrollToTop from './components/ScrolltoTop';

const App = () => {
  const location = useLocation();

  const hideHeaderAndFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App flex flex-col min-h-screen">
      <ToastContainer />
      {!hideHeaderAndFooter && <Header />}
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<SinglePost/>}/>
            <Route path="/my-posts" element={<MyPosts />} />

          <Route path="/createPost" element={<CreatePost/>}/>
<Route path="/all-posts" element={<AllPosts/>} />
<Route path="/edit-post/:id" element={<EditPost/>} />
        </Routes>
      </div>

      {!hideHeaderAndFooter && <Footer />}
    </div>
  );
};

const AppRouter = () => (
  <Router>
      <ScrollToTop /> {/* Place it right here */}

    <App />
  </Router>
);

export default AppRouter;
