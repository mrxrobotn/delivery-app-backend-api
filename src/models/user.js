import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cars: [{
      type: Schema.Types.ObjectId,
      ref: 'Car',
    }],
  },
  {
    timestamps: true,
  }
);

export default model('User', userSchema);
