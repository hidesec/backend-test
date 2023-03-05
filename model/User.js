// Define a schema for the user collection
import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: {
        type: String,
        required: true
    },
  password: {
        type: String,
        required: true
    }
});

// Create a model for the user collection
export default mongoose.model('User', User);