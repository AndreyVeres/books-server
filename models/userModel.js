import { Schema, model } from 'mongoose';

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = model('User', schema);


export default User;
