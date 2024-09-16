require('dotenv').config(); // To load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const File = require('./schema'); // Import File schema
const cors = require('cors')
const app = express();
app.use(cors())
// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// API route to upload file and generate unique code
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const code = shortid.generate();
    const newFile = new File({
      filename: req.file.filename,
      filepath: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      code,
    });
    await newFile.save();
    res.status(201).json({ message: 'File uploaded', code });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error });
  }
});

app.get('/download/:code', async (req, res) => {
    try {
      const file = await File.findOne({ code: req.params.code });
      if (!file) {
        return res.status(404).json({ message: 'Invalid code or file not found' });
      }
      res.download(file.filepath, file.filename, (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
          res.status(500).json({ message: 'Error downloading file' });
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error downloading file', error });
    }
  });
  

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
