import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const UserSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  disponibilities: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  likes: Array,
  dislikes: Array,
  messages: Array
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
