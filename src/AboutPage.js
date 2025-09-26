import React from 'react';

const AboutPage = () => {
  const containerStyle = {
    padding: '60px 80px',
    backgroundColor: '#0d1b2a',
    backgroundImage: 'radial-gradient(circle at top left, #1b263b, #0d1b2a)',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#f0f0f0'
  };

  const headingStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#ffffff',
    animation: 'fadeIn 1s ease-in forwards',
    animationDelay: '0s',
    opacity: 0
  };

  const sectionStyle = (delay) => ({
    marginBottom: '30px',
    animation: 'fadeIn 1s ease-in forwards',
    animationDelay: delay,
    opacity: 0
  });

  const featureListStyle = {
    listStyleType: 'square',
    paddingLeft: '20px',
    lineHeight: 1.7
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div style={containerStyle}>
        <h1 style={headingStyle}>Welcome to SAKEC Metaverse 🌐</h1>

        <div style={sectionStyle('0.5s')}>
          <p>
            <strong>SAKEC Metaverse</strong> is an immersive 3D web-based virtual campus tour designed for Shah & Anchor Kutchhi Engineering College (SAKEC). 
            Whether you're a prospective student, alumni, or visitor, this platform allows you to roam the corridors of SAKEC from anywhere in the world.
          </p>
          <p>
            From exploring classrooms, laboratories, and auditoriums to interacting with live multiplayer avatars and accessing library services—everything is designed to simulate a realistic, engaging, and futuristic college tour experience.
          </p>
        </div>

        <div style={sectionStyle('1.5s')}>
          <h2>🚀 Features</h2>
          <ul style={featureListStyle}>
            <li>Realistic 3D walkthrough of the SAKEC campus</li>
            <li>Live multiplayer avatars with real-time movement and interaction</li>
            <li>Voice & text chat for seamless peer communication</li>
            <li>Clickable and interactive rooms such as Library, Cafeteria, Auditorium, and Labs</li>
            <li>Animated transitions for doors, floors, and teleport zones</li>
            <li>Library management with borrow/return tracking per user</li>
            <li>Live online users list and intuitive UI for easy navigation</li>
          </ul>
        </div>

        <div style={sectionStyle('2.5s')}>
          <h2>🛠️ Technologies Used</h2>
          <ul style={featureListStyle}>
            <li><strong>Frontend:</strong> React, React Three Fiber, Three.js, Socket.io, HTML/CSS</li>
            <li><strong>Backend:</strong> Node.js + Express</li>
            <li><strong>Database:</strong> PostgreSQL via Supabase (used for user systems)</li>
          </ul>
        </div>

        <div style={sectionStyle('3.5s')}>
          <h2>📧 Contact & Credits</h2>
          <p>
            Developed by <strong>Aliza Shaikh</strong> as part of the <strong>HPCL Full-Stack Internship</strong> project. A heartfelt thanks to the faculty, team members, and mentors who provided guidance and encouragement in building this metaverse platform.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
