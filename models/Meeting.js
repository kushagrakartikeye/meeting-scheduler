const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    datetime: { type: Date, required: true },
    participants: [{
        email: { type: String, required: true },
        name: { type: String, required: true },
        status: { type: String, enum: ['invited', 'accepted', 'declined'], default: 'invited' }
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    meetingLink: { type: String }, // For joining the meeting
    reminders: [{ type: Date }],
    status: { type: String, enum: ['scheduled', 'ongoing', 'completed', 'cancelled'], default: 'scheduled' }
}, { timestamps: true });

module.exports = mongoose.model('Meeting', MeetingSchema);
