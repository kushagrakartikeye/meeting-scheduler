import { useState, useEffect } from 'react';
import { meetingAPI } from '../../services/api';
import CreateMeeting from '../Meetings/CreateMeeting';
import MeetingReminder from '../Meetings/MeetingReminder';

const Dashboard = ({ user, onLogout }) => {
  const [meetings, setMeetings] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeetings();
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const loadMeetings = async () => {
    try {
      const response = await meetingAPI.getAll();
      setMeetings(response.data);
    } catch (err) {
      console.error('Failed to load meetings');
    } finally {
      setLoading(false);
    }
  };

  const handleMeetingCreated = (newMeeting) => {
    setMeetings([...meetings, newMeeting]);
  };

  const handleJoinMeeting = async (meetingId) => {
    try {
      const response = await meetingAPI.joinMeeting(meetingId);
      window.open(response.data.meetingLink, '_blank');
    } catch (err) {
      alert('Failed to join meeting');
    }
  };

  const handleRSVP = async (meetingId, status) => {
    try {
      await meetingAPI.rsvp(meetingId, status);
      loadMeetings(); // Refresh meetings
      alert(`RSVP ${status}!`);
    } catch (err) {
      alert('Failed to RSVP');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getMeetingStatus = (meeting) => {
    const now = new Date();
    const meetingTime = new Date(meeting.datetime);
    
    if (meetingTime < now) {
      return 'past';
    } else if (meetingTime - now <= 15 * 60 * 1000) { // 15 minutes
      return 'starting-soon';
    } else {
      return 'upcoming';
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <MeetingReminder />
      
      <header className="dashboard-header">
        <h1>Meeting Scheduler</h1>
        <div className="header-actions">
          <span>Welcome, {user.name}!</span>
          <button onClick={onLogout} className="btn-secondary">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-actions">
          <button 
            onClick={() => setShowCreateModal(true)} 
            className="btn-primary"
          >
            + New Meeting
          </button>
        </div>

        <div className="meetings-list">
          <h2>Your Meetings ({meetings.length})</h2>
          
          {meetings.length === 0 ? (
            <div className="no-meetings">
              <p>No meetings scheduled yet.</p>
              <button 
                onClick={() => setShowCreateModal(true)} 
                className="btn-primary"
              >
                Create Your First Meeting
              </button>
            </div>
          ) : (
            <div className="meetings-grid">
              {meetings.map((meeting) => {
                const status = getMeetingStatus(meeting);
                return (
                  <div key={meeting._id} className={`meeting-card ${status}`}>
                    <div className="meeting-header">
                      <h3>{meeting.title}</h3>
                      <span className={`status-badge ${meeting.status}`}>
                        {meeting.status}
                      </span>
                    </div>
                    
                    <p className="meeting-time">{formatDate(meeting.datetime)}</p>
                    
                    {meeting.description && (
                      <p className="meeting-description">{meeting.description}</p>
                    )}
                    
                    <div className="participants">
                      <strong>Participants ({meeting.participants.length}):</strong>
                      <div className="participants-list">
                        {meeting.participants.map((participant, index) => (
                          <div key={index} className="participant">
                            <span className="participant-name">{participant.name}</span>
                            <span className="participant-email">({participant.email})</span>
                            <span className={`participant-status ${participant.status}`}>
                              {participant.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="meeting-actions">
                      {status === 'starting-soon' && (
                        <button 
                          onClick={() => handleJoinMeeting(meeting._id)}
                          className="btn-join"
                        >
                          🚀 Join Now
                        </button>
                      )}
                      
                      {status === 'upcoming' && (
                        <>
                          <button 
                            onClick={() => handleJoinMeeting(meeting._id)}
                            className="btn-secondary"
                          >
                            Get Link
                          </button>
                          
                          {meeting.createdBy !== user.id && (
                            <div className="rsvp-actions">
                              <button 
                                onClick={() => handleRSVP(meeting._id, 'accepted')}
                                className="btn-accept"
                              >
                                ✓ Accept
                              </button>
                              <button 
                                onClick={() => handleRSVP(meeting._id, 'declined')}
                                className="btn-decline"
                              >
                                ✗ Decline
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateMeeting
          onMeetingCreated={handleMeetingCreated}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
