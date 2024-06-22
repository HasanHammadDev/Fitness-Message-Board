import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
   username: {
      type: String,
      default: 'Anonymous',
      required: true,
   },
   message: {
      type: String,
      required: true,
   },
   timestamp: {
      type: Date,
      default: Date.now,
      required: true,
   },
   title: {
      type: String,
      required: true,
   },
   category: {
      type: String,
      required: true,
   },
   imageUrl: {
      type: String,
      required: false,
   },
}, { collection: 'Messages' });

const Message = mongoose.model('Message', messageSchema);

export default Message;