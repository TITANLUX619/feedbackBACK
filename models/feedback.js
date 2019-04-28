'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedbackSchema = Schema({
  session: String,
  individual: [String],
  group: [String],
  optional: [String]
})

module.exports = mongoose.model('Feedback', FeedbackSchema)