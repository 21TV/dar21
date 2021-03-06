const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema({

  programId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Program'
  },

  startTime: {
    type: Number
  },

  endTime: {
    type: Number
  },

  startDate: {
    type: Date,
    equired: true
  },
  
  endDate: {
    type: Date,
    equired: true
  },

  appointmentId: {
    type: Number,
    required: true
  },

  img: {
    type: String,
    required: true
  },

  rRule: {
    type: String,
    required: true
  },

  dates: {
    type: Array
  },

  freqType: {
    type: Number
  }

})

const Schedule = mongoose.model('schedule', scheduleSchema)
module.exports = Schedule