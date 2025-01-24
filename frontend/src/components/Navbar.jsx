import React from 'react';
import { Link } from 'react-router-dom';
import { ImagePlus, Images, Home, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ImagePlus className="h-8 w-8 text-indigo-600" />
            <span className="font-bold text-xl">Meme Generator</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/create" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <ImagePlus className="h-5 w-5" />
              <span>Create</span>
            </Link>
            <Link to="/my-memes" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <Images className="h-5 w-5" />
              <span>My Memes</span>
            </Link>
            <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
            <Link to="/register" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <UserPlus className="h-5 w-5" />
              <span>Register</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}