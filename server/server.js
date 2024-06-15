import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import Message from './models/Message.js';

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Get all messages
app.get('/messages', async (req, res) => {
   try {
      const messages = await Message.find();
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

// Add a new message
app.post('/messages', async (req, res) => {
   try {
      const newMessage = new Message(req.body);
      await newMessage.save();
      res.status(201).json(newMessage);
   } catch (error) {
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