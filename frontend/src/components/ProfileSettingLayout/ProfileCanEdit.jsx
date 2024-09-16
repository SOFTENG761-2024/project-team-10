import React, { useState } from 'react';
import './ProfileCanEdit.css';

const ProfileCanEdit = ({ profile, onSave }) => {
  const [activeTab, setActiveTab] = useState('About');
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleInputChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/userprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProfile),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          alert('personal profile saved successfully');
          onSave(editedProfile);
        } else {
          throw new Error('save failed');
        }
      } else {
        throw new Error('save failed');
      }
    } catch (error) {
      console.error('save personal failed', error);
      alert('save personal failed');
    }
  };

  const renderAboutTab = () => (
    <>
      <div className="detail-row">
        <div className="detail-item full-width">
          <label>Bio</label>
          <textarea 
            value={editedProfile.bio} 
            onChange={(e) => handleInputChange('bio', e.target.value)}
          />
        </div>
      </div>
      <div className="detail-row">
        <div className="detail-item">
          <label>Research area</label>
          <input 
            type="text" 
            value={editedProfile.researchArea} className='input-field'
            onChange={(e) => handleInputChange('researchArea', e.target.value)}
          />
        </div>
        <div className="detail-item">
          <label>Skills:</label>
          <input 
            type="text" className='input-field'
            value={editedProfile.skills} 
            onChange={(e) => handleInputChange('skills', e.target.value)}
          />
        </div>
      </div>
      {/* Add other fields similar to the above */}
    </>
  );

  const renderPublicationsTab = () => (
    <>
      <div className="detail-row">
        <div className="detail-item full-width">
          <label>Publications</label>
          <textarea 
            value={editedProfile.publications} 
            onChange={(e) => handleInputChange('publications', e.target.value)}
          />
        </div>
      </div>
    </>
  );

  // Add similar render functions for Professional and Teaching/Research tabs

  return (
    <div className="profile-container">
      <div className="tab-bar">
        {['About', 'Publications', 'Professional', 'Teaching /Research'].map(tab => (
          <button 
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="profile-details">
        {activeTab === 'About' && renderAboutTab()}
        {activeTab === 'Publications' && renderPublicationsTab()}
        {/* Add conditions for other tabs */}

        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ProfileCanEdit;