const Meeting = require('../models/Meeting');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Create meeting
exports.createMeeting = async (req, res) => {
    try {
        const { title, description, datetime, participants } = req.body;
        
        // Generate unique meeting link
        const meetingLink = `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 3)}`;
        
        // Process participants - parse name and email
        const processedParticipants = participants.map(participant => {
            if (typeof participant === 'string') {
                // If just email provided, extract name from email
                const email = participant.trim();
                const name = email.split('@')[0].replace(/[._]/g, ' ');
                return { email, name, status: 'invited' };
            } else {
                // If object with name and email
                return { 
                    email: participant.email.trim(), 
                    name: participant.name || participant.email.split('@')[0].replace(/[._]/g, ' '),
                    status: 'invited' 
                };
            }
        });

        const meeting = new Meeting({
            title,
            description,
            datetime: new Date(datetime),
            participants: processedParticipants,
            createdBy: req.user.id,
            meetingLink,
            status: 'scheduled'
        });

        await meeting.save();
        
        // Send email invitations
        await sendInvitations(meeting, processedParticipants);
        
        res.json(meeting);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', err: err.message });
    }
};

// Join meeting
exports.joinMeeting = async (req, res) => {
    try {
        const { meetingId } = req.params;
        const meeting = await Meeting.findById(meetingId);
        
        if (!meeting) {
            return res.status(404).json({ msg: 'Meeting not found' });
        }

        // Update meeting status to ongoing if it's time
        if (new Date() >= meeting.datetime && meeting.status === 'scheduled') {
            meeting.status = 'ongoing';
            await meeting.save();
        }

        res.json({ 
            meetingLink: meeting.meetingLink,
            meeting: meeting 
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// RSVP to meeting
exports.rsvpMeeting = async (req, res) => {
    try {
        const { meetingId } = req.params;
        const { status } = req.body; // 'accepted' or 'declined'
        
        const meeting = await Meeting.findById(meetingId);
        if (!meeting) {
            return res.status(404).json({ msg: 'Meeting not found' });
        }

        // Find participant and update status
        const participant = meeting.participants.find(p => p.email === req.user.email);
        if (participant) {
            participant.status = status;
            await meeting.save();
        }

        res.json({ msg: `RSVP ${status}`, meeting });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get user's meetings
exports.getMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find({
            $or: [
                { createdBy: req.user.id },
                { 'participants.email': req.user.email }
            ]
        }).sort({ datetime: 1 });
        
        res.json(meetings);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get meetings happening soon (for reminders)
exports.getUpcomingMeetings = async (req, res) => {
    try {
        const now = new Date();
        const in15Minutes = new Date(now.getTime() + 15 * 60000);
        
        const upcomingMeetings = await Meeting.find({
            datetime: { $gte: now, $lte: in15Minutes },
            status: 'scheduled',
            $or: [
                { createdBy: req.user.id },
                { 'participants.email': req.user.email }
            ]
        });

        res.json(upcomingMeetings);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// MongoDB Aggregation endpoint - meetings summary
exports.getMeetingsSummary = async (req, res) => {
    try {
        const summary = await Meeting.aggregate([
            { 
                $match: { 
                    $or: [
                        { createdBy: req.user.id },
                        { 'participants.email': req.user.email }
                    ]
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$datetime" } },
                    count: { $sum: 1 },
                    meetings: { $push: { 
                        title: "$title", 
                        datetime: "$datetime",
                        status: "$status",
                        participantCount: { $size: "$participants" }
                    }}
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(summary);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Email function
async function sendInvitations(meeting, participants) {
    console.log(`📧 Sending invites for "${meeting.title}" to:`);
    participants.forEach(participant => {
        console.log(`  - ${participant.name} (${participant.email})`);
    });
    console.log(`🔗 Meeting Link: ${meeting.meetingLink}`);
    console.log(`📅 Date/Time: ${meeting.datetime}`);
}
