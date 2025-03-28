import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'candidate'], default: 'candidate' },
  username: { type: String, default: null }, // Remove unique constraint
});

export default mongoose.model('User', userSchema);