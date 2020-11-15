import mongoose from 'mongoose';

export interface UserAttrs {
  email: string;
  password: string;
}

export interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any;
}


