const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Offering Schema
const ContentOffering = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageToDisplay: { type: String },
  region: { type: String, enum: ['USA', 'DUBAI', 'INDIA'], default: 'USA' },
  views: { type: Number, default: 0 },
  kprRating: { type: Number, default: 0.0},
  pressReleaseLink: { type: String },
  listedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  listedDate: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: [
      'Content Distribution',
      'Ads',
      'Youtube Influencer',
      'Telegram Influencer',
      'Instagram Influencer',
      'Twitter Influencer',
      'ICO Listing',
      'Exchange Listing'
    ],
    default: 'Content Distribution'
  },
  gambling: { type: Boolean, default: false },
  web3: { type: Boolean, default: false },
  adult: { type: Boolean, default: false },
  gaming: { type: Boolean, default: false },
  publisherWebsiteName: { type: String },
  publisherWebsiteLink: { type: String },
  publisherCompanyLogoLink: { type: String },
  caseStudyDocLink: { type: String },
  emailToContact: { type: String, required: true },
  telegramLink: { type: String },
  features: { type: [String], default: [] },
  languages: {
    type: String,
    enum: ['English', 'Hindi', 'Arabic', 'Urdu', 'Other'],
    default: 'English'
  }
});

module.exports = mongoose.model('Offering', ContentOffering);
