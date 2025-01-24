import React from 'react';
import { Link } from 'react-router-dom';
import { ImagePlus } from 'lucide-react';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Amazing Memes</h1>
      <p className="text-xl text-gray-600 mb-8">Choose from hundreds of templates or upload your own image</p>
      
      <Link
        to="/create"
        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <ImagePlus className="mr-2 h-5 w-5" />
        Create a Meme
      </Link>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Template previews will go here */}
      </div>
    </div>
  );
}
