import React, { useState } from 'react';
import './Career.css';
import ContentComponent from './ContentComponent';

const Career = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const [tab, setTab] = useState('about');

  const handleInputChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleSave = () => {
    onSave(editedProfile);
    setIsEditing(false);
  };

  return (
    <div className="career">
      <div className="career__tab-navigation">
        <button className={`career__tab ${tab === 'about' ? 'career__tab--active' : ''}`} onClick={() => setTab('about')}>About</button>
        <button className={`career__tab ${tab === 'publications' ? 'career__tab--active' : ''}`} onClick={() => setTab('publications')}>Publications</button>
        <button className={`career__tab ${tab === 'professional' ? 'career__tab--active' : ''}`} onClick={() => setTab('professional')}>Professional</button>
        <button className={`career__tab ${tab === 'teaching' ? 'career__tab--active' : ''}`} onClick={() => setTab('teaching')}>Teaching /Research</button>
      </div>
      {tab === 'about' && <div className="career__content">
        <div className="career__detail-row">
          <div className="career__detail-item career__detail-item--full-width">
            <label>Bio</label>
            <textarea
              readOnly={!isEditing}
              value={editedProfile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
            />
          </div>
        </div>
        <div className="career__detail-row">
          <div className="career__detail-item">
            <label>Research area</label>
            <input
              type="text"
              readOnly={!isEditing}
              value={editedProfile.researchArea}
              onChange={(e) => handleInputChange('researchArea', e.target.value)}
            />
          </div>
          <div className="career__detail-item">
            <label>Skills:</label>
            <input
              type="text"
              readOnly={!isEditing}
              value={editedProfile.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
            />
          </div>
        </div>
        <div className="career__detail-row">
          <div className="career__detail-item">
            <label>Expertise</label>
            <input
              type="text"
              readOnly={!isEditing}
              value={editedProfile.expertise}
              onChange={(e) => handleInputChange('expertise', e.target.value)}
            />
          </div>
          <div className="career__detail-item">
            <label>Research Keywords</label>
            <input
              type="text"
              readOnly={!isEditing}
              value={editedProfile.researchKeywords}
              onChange={(e) => handleInputChange('researchKeywords', e.target.value)}
            />
          </div>
        </div>
        <div className="career__detail-row">
          <div className="career__detail-item">
            <label>Research Tags</label>
            <input
              type="text"
              readOnly={!isEditing}
              value={editedProfile.researchTags}
              onChange={(e) => handleInputChange('researchTags', e.target.value)}
            />
          </div>
          <div className="career__detail-item">
            <label>Tools:</label>
            <input
              type="text"
              readOnly={!isEditing}
              value={editedProfile.tools}
              onChange={(e) => handleInputChange('tools', e.target.value)}
            />
          </div>
        </div>
        <div className="career__detail-row">
          <div className="career__detail-item">
            <label>Custom</label>
            <input
              type="text"
              readOnly={!isEditing}
              value={editedProfile.custom1}
              onChange={(e) => handleInputChange('custom1', e.target.value)}
            />
          </div>
          <div className="career__detail-item">
            <label>Custom</label>
            <input
              type="text"
              readOnly={!isEditing}
              value={editedProfile.custom2}
              onChange={(e) => handleInputChange('custom2', e.target.value)}
            />
          </div>
        </div>
        <div className="career__detail-row">
          <div className="career__detail-item career__detail-item--full-width">
            <label>Media File Thumbnail</label>
            <textarea
              readOnly={!isEditing}
              value={editedProfile.mediaFileThumbnail}
              onChange={(e) => handleInputChange('mediaFileThumbnail', e.target.value)}
            />
          </div>
        </div>
        <div className="career__detail-row">
          <div className="career__detail-item career__detail-item--full-width">
            <label>Doc File Thumbnail</label>
            <textarea
              readOnly={!isEditing}
              value={editedProfile.docFileThumbnail}
              onChange={(e) => handleInputChange('docFileThumbnail', e.target.value)}
            />
          </div>
        </div>
        <button className="career__edit-button" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>}
      {tab !== 'about' && <ContentComponent />}
    </div>
  );
};

export default Career;