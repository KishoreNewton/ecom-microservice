import mongoose from 'mongoose';
import { UserAttrs, UserModel } from '../interface/user-model-interface';

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
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<any, UserModel>('User', userSchema);

User.build({
    email: "test@test.com",
    password: "passord"
});

export { User };
