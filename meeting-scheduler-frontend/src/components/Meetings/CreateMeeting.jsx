import { useState } from 'react';
import { meetingAPI } from '../../services/api';

const CreateMeeting = ({ onMeetingCreated, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    datetime: '',
    participants: [{ name: '', email: '' }]
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const meetingData = {
        ...formData,
        participants: formData.participants.filter(p => p.email.trim())
      };
      
      const response = await meetingAPI.create(meetingData);
      onMeetingCreated(response.data);
      onClose();
    } catch (err) {
      alert('Failed to create meeting: ' + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  const addParticipant = () => {
    setFormData({
      ...formData,
      participants: [...formData.participants, { name: '', email: '' }]
    });
  };

  const removeParticipant = (index) => {
    const newParticipants = formData.participants.filter((_, i) => i !== index);
    setFormData({ ...formData, participants: newParticipants });
  };

  const updateParticipant = (index, field, value) => {
    const newParticipants = [...formData.participants];
    newParticipants[index][field] = value;
    setFormData({ ...formData, participants: newParticipants });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Create New Meeting</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Meeting Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label>Date & Time</label>
            <input
              type="datetime-local"
              value={formData.datetime}
              onChange={(e) => setFormData({...formData, datetime: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Participants</label>
            {formData.participants.map((participant, index) => (
              <div key={index} className="participant-row">
                <input
                  type="text"
                  placeholder="Name"
                  value={participant.name}
                  onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={participant.email}
                  onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                  required
                />
                {formData.participants.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeParticipant(index)}
                    className="remove-participant"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addParticipant} className="add-participant">
              + Add Participant
            </button>
          </div>
          
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Creating...' : 'Create Meeting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeeting;
