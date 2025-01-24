const express = require('express');
const router = express.Router();
const Meme = require('../models/Meme');
const { protect } = require('../middleware/authMiddleware');

// @route   POST api/memes
// @desc    Create a new meme
// @access  Private
router.post('/', protect, async (req, res) => {
  const { template, text, customizations } = req.body;

  try {
    // Basic input validation
    if (!template) {
      return res.status(400).json({ message: "Template ID is required" });
    }
    
    const newMeme = new Meme({
      user: req.user.id,
      template,
      text,
      customizations,
      imageUrl: '', // Generate or update this after image processing
    });

    // Call the function to generate meme image and get the URL
    const imageUrl = await generateMemeImage(template, text, customizations);
    newMeme.imageUrl = imageUrl;

    const meme = await newMeme.save();
    res.status(201).json(meme);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/memes/user
// @desc    Get all memes for logged-in user
// @access  Private
router.get('/user', protect, async (req, res) => {
  try {
    const memes = await Meme.find({ user: req.user.id }).populate('template', 'name imageUrl');
    res.json(memes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/memes/:id
// @desc    Get specific meme
// @access  Public (or Private if you want only the owner to access)
router.get('/:id', async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id).populate('template', 'name imageUrl');
    if (!meme) {
      return res.status(404).json({ message: 'Meme not found' });
    }
    res.json(meme);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/memes/:id
// @desc    Update a meme
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { text, customizations } = req.body;

  try {
    let meme = await Meme.findById(req.params.id);
    if (!meme) {
      return res.status(404).json({ message: 'Meme not found' });
    }

    // Make sure user owns the meme
    if (meme.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    meme.text = text;
    meme.customizations = customizations;

    // Regenerate meme image if needed
    const imageUrl = await generateMemeImage(meme.template, text, customizations);
    meme.imageUrl = imageUrl;

    meme = await meme.save();
    res.json(meme);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/memes/:id
// @desc    Delete a meme
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    let meme = await Meme.findById(req.params.id);
    if (!meme) {
      return res.status(404).json({ message: 'Meme not found' });
    }

    // Make sure user owns the meme
    if (meme.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await meme.remove();
    res.json({ message: 'Meme removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;