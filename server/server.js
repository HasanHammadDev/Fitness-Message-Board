import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import connectDB from './db.js';
import Message from './models/Message.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Error handling middleware for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next();
});

// Google Cloud Storage setup
const storage = new Storage({
   keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

// Multer setup for file uploads
const upload = multer({
   storage: multer.memoryStorage(),
   limits: {
      fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
   },
});

// Get all messages
app.get('/messages', async (req, res) => {
   try {
      let query = {};
      const { categories } = req.query;

      if (categories) {
         query = { category: { $in: categories.split(',') } };
      }

      const messages = await Message.find(query);
      res.json(messages);
   } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
   }
});

// Get a specific message by ID
app.get('/messages/:id', async (req, res) => {
   try {
      const message = await Message.findById(req.params.id);
      if (message) {
         res.json(message);
      } else {
         res.status(404).json({ error: 'Message not found' });
      }
   } catch (error) {
      res.status(500).json({ error: 'Failed to fetch message' });
   }
});

// Add a new message with image upload
app.post('/messages', upload.single('image'), async (req, res) => {
   try {
      let imageUrl = '';
      if (req.file) {
         const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
         const blobStream = blob.createWriteStream({
            resumable: false,
         });

         blobStream.on('error', (err) => {
            console.error('Blob stream error:', err);
            res.status(500).json({ error: 'Failed to upload image' });
         });

         blobStream.on('finish', async () => {
            imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            
            const newMessage = new Message({
               ...req.body,
               imageUrl,
            });
            await newMessage.save();
            res.status(201).json(newMessage);
         });

         blobStream.end(req.file.buffer);
      } else {
         const newMessage = new Message(req.body);
         await newMessage.save();
         res.status(201).json(newMessage);
      }
   } catch (error) {
      console.error('Error adding message:', error);
      res.status(500).json({ error: 'Failed to add message' });
   }
});

// Edit an existing message
app.put('/messages/:id', async (req, res) => {
   try {
      const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updatedMessage) {
         res.json(updatedMessage);
      } else {
         res.status(404).json({ error: 'Message not found' });
      }
   } catch (error) {
      res.status(500).json({ error: 'Failed to edit message' });
   }
});

// Delete a message
app.delete('/messages/:id', async (req, res) => {
   try {
      const deletedMessage = await Message.findByIdAndDelete(req.params.id);
      if (deletedMessage) {
         res.json(deletedMessage);
      } else {
         res.status(404).json({ error: 'Message not found' });
      }
   } catch (error) {
      res.status(500).json({ error: 'Failed to delete message' });
   }
});

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}/`);
});
