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
          <Route path="/createPost" element={<CreatePost/>}/>
        </Routes>
      </div>

      {!hideHeaderAndFooter && <Footer />}
    </div>
  );
};

const AppRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppRouter;
