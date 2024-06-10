import mongoose, { Document, Schema, Model, model } from 'mongoose';

// Interface for User
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: string[];
}
const bcrypt = require("bcrypt")
// User Schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerfied:{type:Boolean,default:false},
  isAdmin:{type:Boolean,default:false},
  roles: { type: [String], required: true, default: ['user'] },
  forgotPasswordToken:String,
  forgotPasswordTokenExpiry:Date,
  verifyToken:String,
  verifyTokenExpiry:Date,
}, {
  timestamps: true,
});


UserSchema.pre<IUser>('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      return next();
    }
  }
  next();
});

const User =mongoose.models.auths || mongoose.model<IUser>('auths', UserSchema)
export default User;


