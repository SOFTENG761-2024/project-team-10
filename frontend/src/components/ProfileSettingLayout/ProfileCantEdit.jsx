import React, { useState } from 'react';
import './ProfileCantEdit.css';

const ProfileCantEdit = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleSaveClick = () => {
    // Save the edited profile (e.g., send to server)
    setIsEditing(false);
  };

  return (
    <div className="profile-cant-edit__container">
      <div className="profile-cant-edit__card">
        <div className="profile-cant-edit__card-header">
          <img src={profile.photo} alt="Profile" className="profile-cant-edit__photo" />
          <div className="profile-cant-edit__info">
            <h2>Name: {profile.fullName}</h2>
            <p>Title: {profile.title}</p>
            <p>Affiliation: {profile.affiliation}</p>
          </div>
        </div>
        <div className="profile-cant-edit__details">
          <div className="profile-cant-edit__detail-row">
            <div className="profile-cant-edit__detail-item">
              <label>Full Name:</label>
              <input
                type="text"
                value={editedProfile.fullName}
                readOnly={!isEditing}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
              />
            </div>
            <div className="profile-cant-edit__detail-item">
              <label>Last Name:</label>
              <input
                type="text"
                value={editedProfile.lastName}
                readOnly={!isEditing}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>
          </div>
          <div className="profile-cant-edit__detail-row">
            <div className="profile-cant-edit__detail-item">
              <label>Preferred Name:</label>
              <input
                type="text"
                value={editedProfile.preferredName}
                readOnly={!isEditing}
                onChange={(e) => handleInputChange('preferredName', e.target.value)}
              />
            </div>
            <div className="profile-cant-edit__detail-item">
              <label>E-mail Address:</label>
              <input
                type="text"
                value={editedProfile.email}
                readOnly={!isEditing}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>
          <div className="profile-cant-edit__detail-row">
            <div className="profile-cant-edit__detail-item">
              <label>ORCID ID:</label>
              <input
                type="text"
                value={editedProfile.orcid}
                readOnly={!isEditing}
                onChange={(e) => handleInputChange('orcid', e.target.value)}
              />
            </div>
            <div className="profile-cant-edit__detail-item">
              <label>Linkedin:</label>
              <input
                type="text"
                value={editedProfile.linkedin}
                readOnly={!isEditing}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
              />
            </div>
          </div>
          <div className="profile-cant-edit__affiliations">
            <h3>Affiliations:</h3>
            <div className="profile-cant-edit__detail-row">
              <div className="profile-cant-edit__detail-item">
                <label>Name:</label>
                <input
                  type="text"
                  value={editedProfile.affiliations}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange('affiliations', e.target.value)}
                />
              </div>
              <div className="profile-cant-edit__detail-item">
                <label>Role and Title:</label>
                <input
                  type="text"
                  value={editedProfile.role}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="profile-cant-edit__button-row">
            <button className="profile-cant-edit__add-button" disabled={!isEditing}>+Add Secondary Email Address</button>
            <button className="profile-cant-edit__add-button" disabled={!isEditing}>+Add Secondary Affiliation</button>
          </div>
          <div className="profile-cant-edit__note">
            <p>Please note! Most of the details are populated via Tuakiri and cannot be changed here.</p>
          </div>
          {isEditing ? (
            <button className="profile-cant-edit__edit-button" onClick={handleSaveClick}>Save</button>
          ) : (
            <button className="profile-cant-edit__edit-button" onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCantEdit;