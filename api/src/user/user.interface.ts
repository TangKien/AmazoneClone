import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface UserDetails extends mongoose.Document {
  id? : string;
  name: string;
  email: string;
}