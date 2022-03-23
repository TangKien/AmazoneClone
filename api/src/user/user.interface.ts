import * as mongoose from 'mongoose';
import {Document} from 'mongoose';
export interface User extends mongoose.Document {
  id?: string;
  name: string;
  email: string;
}

