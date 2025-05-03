import React, { useState } from 'react';

// Dummy data for profiles
const profiles = [
  {
    id: 1,
    name: 'SMg Is Him',
    image: 'https://example.com/profile1.jpg',
    description: 'Creator Profile',
    lastActive: 'January 22, 2025',
  },
  {
    id: 2,
    name: 'r7105',
    image: 'https://example.com/profile2.jpg',
    description: 'Main Artist Account',
    lastActive: 'January 20, 2025',
  },
];

const ProfileSelect = () => {
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (e) => {
    // Handle profile image or data update logic here
  };

  return (
    <div className="profile-select">
      <div className="profile-select-header">
        <h1>Select Your Profile</h1>
        <button onClick={handleEditToggle}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Preview */}
      <div className="profile-preview">
        <img
          src={selectedProfile.image}
          alt={selectedProfile.name}
          className="profile-img"
        />
        <div className="profile-details">
          <h2>{selectedProfile.name}</h2>
          <p>{selectedProfile.description}</p>
          <p>Last Active: {selectedProfile.lastActive}</p>
        </div>
      </div>

      {/* Profile List */}
      <div className="profile-list">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className={`profile-item ${profile.id === selectedProfile.id ? 'active' : ''}`}
            onClick={() => handleProfileClick(profile)}
          >
            <img src={profile.image} alt={profile.name} className="profile-img" />
            <div className="profile-info">
              <h3>{profile.name}</h3>
              <p>{profile.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Settings */}
      <div className="profile-actions">
        <button onClick={() => alert('Settings for profile')}>
          Profile Settings
        </button>
      </div>

      {/* Add New Profile */}
      <div className="add-profile">
        <button onClick={() => alert('Add new profile')}>+ Add New Profile</button>
      </div>
    </div>
  );
};

export default ProfileSelect;
