import React, { useState, useEffect } from 'react';
import { memeApi } from '../api/memeApi';
import { Pencil, Trash2 } from 'lucide-react';

function MyMemes() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const response = await memeApi.getUserMemes();
      setMemes(response.data);
    } catch (err) {
      // Handle error without logging the full error object
      setError('Failed to fetch memes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this meme?')) {
      try {
        await memeApi.deleteMeme(id);
        setMemes(memes.filter(meme => meme.id !== id));
      } catch (err) {
        // Handle error without logging the full error object
        setError('Failed to delete meme. Please try again later.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Memes</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {!error && memes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">You haven't created any memes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme) => (
            <div key={meme.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={meme.imageUrl} 
                alt={`Meme ${meme.id}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Created {new Date(meme.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleDelete(meme.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button 
                      className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-full"
                    >
                      <Pencil size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyMemes;