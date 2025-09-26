import React from 'react';

export default function SeminarHall({ onBack }) {
  return (
    <div style={styles.container}>
      {/* 🔥 Animated Gradient Background */}
      <style>
        {`
          @keyframes glowAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <div style={styles.glowBackground}></div>

      <h1 style={styles.heading}>🎤 Seminar Hall</h1>
      <p style={styles.subheading}>
        Where ideas come to life through talks, workshops & guest lectures
      </p>

      <div style={styles.card}>
        <div style={styles.textSection}>
          <p style={styles.text}>
            The Seminar Hall at <strong>SAKEC</strong> is a state-of-the-art venue designed to host a diverse range of academic and professional events. From insightful guest lectures delivered by industry leaders to student-led symposiums, this space serves as a hub for learning beyond textbooks.
          </p>
          <p style={styles.text}>
            Equipped with high-definition projectors, smart audio systems, and climate control, the hall provides a comfortable environment conducive to focused discussions and large-scale presentations. With a seating capacity that caters to both intimate sessions and wider gatherings, it plays a pivotal role in enhancing student engagement and exposure.
          </p>
          <p style={styles.text}>
            Whether it's a tech talk, alumni meet, startup pitch, or interdisciplinary seminar, this hall fosters collaborative thinking and innovation. It's not just a room—it's where ambitions meet opportunities.
          </p>
        </div>

        <img
          src="/seminarhall.png"
          alt="Seminar Hall"
          style={styles.image}
        />
      </div>

      <button onClick={onBack} style={styles.button}>
        ← Back to Place Selection
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: '60px 30px',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    color: '#000'
  },
  glowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(270deg, #ede7f6, #d1c4e9, #b39ddb)',
    backgroundSize: '600% 600%',
    animation: 'glowAnimation 4s ease infinite',
    zIndex: -1
  },
  heading: {
    fontSize: '36px',
    color: '#4a148c',
    marginBottom: '10px'
  },
  subheading: {
    fontSize: '18px',
    color: '#6a1b9a',
    marginBottom: '40px'
  },
  card: {
    maxWidth: '1100px',
    margin: '0 auto 40px',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    padding: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    flexWrap: 'wrap'
  },
  textSection: {
    flex: 1,
    minWidth: '300px',
    textAlign: 'left'
  },
  image: {
    width: '420px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  },
  text: {
    fontSize: '17px',
    color: '#333',
    lineHeight: '1.7',
    marginBottom: '20px'
  },
  button: {
    padding: '12px 26px',
    fontSize: 16,
    background: '#7b1fa2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
  }
};
