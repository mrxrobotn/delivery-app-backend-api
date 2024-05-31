import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const audioSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Audio', audioSchema);
