import { useState, useEffect } from 'react';
import { meetingAPI } from '../../services/api';

const MeetingReminder = () => {
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    const checkUpcomingMeetings = async () => {
      try {
        const response = await meetingAPI.getUpcoming();
        if (response.data.length > 0) {
          setUpcomingMeetings(response.data);
          setShowReminder(true);
          
          // Play notification sound (optional)
          if ('Notification' in window && Notification.permission === 'granted') {
            response.data.forEach(meeting => {
              new Notification(`Meeting Starting Soon!`, {
                body: `"${meeting.title}" starts in 15 minutes`,
                icon: '/meeting-icon.png'
              });
            });
          }
        }
      } catch (err) {
        console.error('Failed to check upcoming meetings');
      }
    };

    // Check every minute
    const interval = setInterval(checkUpcomingMeetings, 60000);
    checkUpcomingMeetings(); // Check immediately

    return () => clearInterval(interval);
  }, []);

  const handleJoinMeeting = async (meetingId) => {
    try {
      const response = await meetingAPI.joinMeeting(meetingId);
      window.open(response.data.meetingLink, '_blank');
      setShowReminder(false);
    } catch (err) {
      alert('Failed to join meeting');
    }
  };

  if (!showReminder || upcomingMeetings.length === 0) {
    return null;
  }

  return (
    <div className="reminder-overlay">
      <div className="reminder-popup">
        <h3>🔔 Meeting Starting Soon!</h3>
        {upcomingMeetings.map(meeting => (
          <div key={meeting._id} className="reminder-meeting">
            <h4>{meeting.title}</h4>
            <p>Starts: {new Date(meeting.datetime).toLocaleTimeString()}</p>
            <div className="reminder-actions">
              <button 
                onClick={() => handleJoinMeeting(meeting._id)}
                className="btn-primary"
              >
                Join Meeting
              </button>
              <button 
                onClick={() => setShowReminder(false)}
                className="btn-secondary"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingReminder;
