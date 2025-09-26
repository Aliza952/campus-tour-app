// src/SettingsPage.js
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import ProfileCard from './ProfileCard';

const SettingsPage = ({ username, setUsername, avatarColor, setAvatarColor }) => {
  const [tempUsername, setTempUsername] = useState(username);
  const [tempColor, setTempColor] = useState(avatarColor || '#3498db');
  const [message, setMessage] = useState('');

  // Local fields
  const [gender, setGender] = useState(localStorage.getItem('gender') || '');
  const [hobby, setHobby] = useState(localStorage.getItem('hobby') || '');
  const [profession, setProfession] = useState(localStorage.getItem('profession') || '');
  const [bio, setBio] = useState(localStorage.getItem('bio') || '');
  const [city, setCity] = useState(localStorage.getItem('city') || '');

  useEffect(() => {
    setTempUsername(username);
    setTempColor(avatarColor || '#3498db');
  }, [username, avatarColor]);

  const handleSave = async () => {
    setUsername(tempUsername);
    setAvatarColor(tempColor);
    localStorage.setItem('username', tempUsername);
    localStorage.setItem('avatarColor', tempColor);
    localStorage.setItem('gender', gender);
    localStorage.setItem('hobby', hobby);
    localStorage.setItem('profession', profession);
    localStorage.setItem('bio', bio);
    localStorage.setItem('city', city);

    try {
      const { data, error } = await supabase
        .from('users')
        .upsert([{ username: tempUsername, avatar_color: tempColor }]);

      if (error) {
        console.error('Supabase error:', error.message);
        setMessage('❌ Error saving to Supabase');
      } else {
        console.log('✅ Saved to Supabase:', data);
        setMessage('✅ Settings saved!');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setMessage('❌ Could not connect to Supabase');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      padding: '120px 40px 40px',
      flexWrap: 'wrap'
    }}>
      {/* Settings Panel */}
      <div style={{
        padding: '40px',
        maxWidth: '500px',
        flex: '1',
        backgroundColor: '#f7f7f7',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: 'black' }}>⚙️ Settings</h1>

        <label style={{ color: 'black' }}>Username</label>
        <input
          type="text"
          value={tempUsername}
          onChange={(e) => setTempUsername(e.target.value)}
          style={{ width: '95%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '20px' }}
        />

        <label style={{ color: 'black' }}>Favourite Color</label>
        <input
          type="color"
          value={tempColor}
          onChange={(e) => setTempColor(e.target.value)}
          style={{ width: '100%', height: '50px', marginBottom: '20px' }}
        />

        <label style={{ color: 'black' }}>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px' }}>
          <option value="">Select</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>

        <label style={{ color: 'black' }}>Hobby</label>
        <input
          type="text"
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
          placeholder="e.g., Painting, Gaming"
          style={{ width: '95%', padding: '10px', marginBottom: '20px' }}
        />

        <label style={{ color: 'black' }}>Profession</label>
        <input
          type="text"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          placeholder="e.g., Student, Developer"
          style={{ width: '95%', padding: '10px', marginBottom: '20px' }}
        />

        <label style={{ color: 'black' }}>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us something about yourself..."
          style={{ width: '95%', padding: '10px', marginBottom: '20px', resize: 'vertical' }}
        />

        <label style={{ color: 'black' }}>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Your city"
          style={{ width: '95%', padding: '10px', marginBottom: '20px' }}
        />

        <button
          onClick={handleSave}
          style={{ width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Save Settings
        </button>

        {message && <p style={{ textAlign: 'center', marginTop: '15px', color: 'green' }}>{message}</p>}
      </div>

      {/* Profile Card Preview */}
      <div style={{
        flex: '1',
        minWidth: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ProfileCard
  name={tempUsername || "Your Name"}
  title="Metaverse Explorer"
  handle={tempUsername || "yourhandle"} 
  status="Online"
  contactText="Contact Me"
  avatarUrl="/avatar.png"
  miniAvatarUrl="/avatar.png"
  showUserInfo={true}
  enableTilt={true}
  onContactClick={() => console.log('Contact clicked')}
  gender={gender}
  hobby={hobby}
  profession={profession}
  bio={bio}
  city={city}
/>

      </div>
    </div>
  );
};

export default SettingsPage;
