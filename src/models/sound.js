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
    car: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Audio', audioSchema);
