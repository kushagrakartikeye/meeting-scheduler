const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
    createMeeting, 
    getMeetings, 
    getMeetingsSummary,
    joinMeeting,
    rsvpMeeting,
    getUpcomingMeetings
} = require('../controllers/meetingController');

router.post('/', auth, createMeeting);
router.get('/', auth, getMeetings);
router.get('/summary', auth, getMeetingsSummary);
router.get('/upcoming', auth, getUpcomingMeetings);
router.get('/:meetingId/join', auth, joinMeeting);
router.put('/:meetingId/rsvp', auth, rsvpMeeting);

module.exports = router;
