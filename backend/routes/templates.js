const express = require('express');
const router = express.Router();
const https = require('https');

// @route   GET api/templates
// @desc    Get all meme templates from RapidAPI
// @access  Public
router.get('/', async (req, res) => {
  const options = {
    method: 'GET',
    hostname: 'meme-generator-and-template-database.p.rapidapi.com',
    path: '/templates',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'meme-generator-and-template-database.p.rapidapi.com',
    },
  };

  const apiReq = https.request(options, (apiRes) => {
    const chunks = [];

    apiRes.on('data', (chunk) => {
      chunks.push(chunk);
    });

    apiRes.on('end', () => {
      const body = Buffer.concat(chunks);
      try {
        const responseData = JSON.parse(body.toString());
        
        // Extract only the template names (keys) into an array
        const templateNames = Object.keys(responseData); 

        res.json(templateNames); // Send the array of template names
      } catch (parseError) {
        console.error('Error parsing RapidAPI response:', parseError);
        res.status(500).json({ message: 'Error parsing API response' });
      }
    });
  });

  apiReq.on('error', (error) => {
    console.error('Error fetching templates from RapidAPI:', error);
    res.status(500).json({ message: 'Error fetching templates from API' });
  });

  apiReq.end();
});



const request = require('request');

router.post('/:templateName/caption', async (req, res) => {
    const { templateName } = req.params;
    const { topText, bottomText, fontSize, font = 'impact', textColor = '(0,0,0)' } = req.body;

    const options = {
        method: 'POST',
        url: `https://meme-generator-and-template-database.p.rapidapi.com/caption/${templateName}`,
        qs: {
            tsize: fontSize,
            bsize: fontSize,
            font: font,
            top: topText,
            bottom: bottomText,
        },
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'meme-generator-and-template-database.p.rapidapi.com',
            'Content-Type': 'application/json',
        },
        body: { // You only need this if you want more fine-grained control than what's provided in qs
            top: {
                text: topText,
                text_align: 'center',
                font_size: fontSize,
                font: font,
                text_color: textColor,
                text_stroke_width: 0,
            },
            bot: {
                text: bottomText,
                text_align: 'center',
                font_size: fontSize,
                font: font,
                text_color: textColor,
                text_stroke_width: 0,
            },
        },
        json: true,
    };
    
    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to generate meme' });
        }

        if (response.statusCode !== 200) {
            console.error('API Error:', response.statusCode, body);
            return res.status(response.statusCode).json({ error: 'API Error', details: body });
        }
        res.json(body);
    });
});
  
  module.exports = router;