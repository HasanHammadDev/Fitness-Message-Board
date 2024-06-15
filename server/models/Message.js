import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
   username: {
      type: String,
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
}, { collection: 'Messages' });

const Message = mongoose.model('Message', messageSchema);

export default Message;