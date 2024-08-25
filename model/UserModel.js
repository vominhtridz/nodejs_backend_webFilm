import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    },
    roles: {
        Users: {
            type: Number,
            default:2001
        },
        Editor: Number,
        Admin:Number
    },
    refreshToken: String
});
export default mongoose.model('User',UserSchema)