import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImagePlus, Type, Palette } from 'lucide-react';

function Create() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fontSize, setFontSize] = useState(32);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [templates, setTemplates] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('/api/templates');
        setTemplates(response.data);
        console.log('Templates fetched:', response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (selectedTemplate) {
        try {
          const response = await axios.post(
            `/api/templates/${selectedTemplate}/caption`,
            {
              topText: topText,
              bottomText: bottomText,
              fontSize: fontSize,
              textColor: textColor,
            }
          );
          setImageUrl(response.data.url);
        } catch (error) {
          console.error('Error fetching image:', error);
          setImageUrl('');
        }
      } else {
        setImageUrl('');
      }
    };

    fetchImage();
  }, [selectedTemplate, topText, bottomText, fontSize, textColor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const memeData = {
        template: selectedTemplate,
        text: topText,
        customizations: {
          fontSize,
          textColor,
        },
      };

      const response = await axios.post('/api/memes', memeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Corrected line
        },
      });
      console.log('Meme created:', response.data);
      // Handle success
    } catch (error) {
      console.error('Error creating meme:', error);
      // Handle error
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Create Your Meme
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Preview Area */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt="Selected template" className="max-w-full h-auto" />
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <ImagePlus size={48} />
                <p className="mt-2">
                  {selectedTemplate ? 'Loading Preview...' : 'Select a template'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-6">
            {/* Template Selection Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Choose a template</option>
                {templates.map((templateName) => (
                  <option key={templateName} value={templateName}>
                    {templateName}
                  </option>
                ))}
              </select>
            </div>

            {/* Other input fields: topText, bottomText, fontSize */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Top Text
              </label>
              <div className="flex items-center">
                <Type className="text-gray-400 mr-2" size={20} />
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter top text"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bottom Text
              </label>
              <div className="flex items-center">
                <Type className="text-gray-400 mr-2" size={20} />
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter bottom text"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size
              </label>
              <input
                type="range"
                min="16"
                max="64"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{fontSize}px</span>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Generate Meme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;