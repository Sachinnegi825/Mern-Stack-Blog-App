import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto flex flex-col  justify-between items-center space-y-4 md:space-y-0">
       

        <div className="space-x-4">
          <a href="https://x.com/SACHINN68557499" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            Twitter
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            Facebook
          </a>
          <a href="https://www.linkedin.com/in/sachin-negi-54aaba222/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            LinkedIn
          </a>
        </div>

        
        <div className="text-gray-400">
          &copy;2024 SachinBlogApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
