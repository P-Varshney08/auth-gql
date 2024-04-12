import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    recipe: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
