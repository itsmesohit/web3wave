
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNo: { type: String },
    password: { type: String },
    token: { type: String },
    role: { 
      type: String, 
      enum: ['Admin', 'Publisher', 'Visitor'], 
      default: 'Publisher'
    },
    offerings: [{ type: Schema.Types.ObjectId, ref: 'Offering' }],
    orderHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Offering' }],
    region: { 
      type: String, 
      enum: ['USA', 'DUBAI', 'INDIA'], 
      default: 'USA' 
    },
    itemsInCart: [{ type: Schema.Types.ObjectId, ref: 'Offering' }]
  });
  
  module.exports = mongoose.model('User', UserSchema);
  