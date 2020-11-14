import mongoose from 'mongoose';
import { UserAttrs } from '../interface/user-interface';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};



export { User, buildUser };
