import React from 'react';

export default function Auditorium({ onBack }) {
  return (
    <div style={styles.container}>
      {/* Animated Glow Background */}
      <style>
        {`
          @keyframes backgroundGlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <div style={styles.glow}></div>

      <h1 style={styles.heading}>🎤 SAKEC Auditorium</h1>
      <p style={styles.subheading}>
        The centerpiece for culture, celebration, and collaboration.
      </p>

      <div style={styles.card}>
        <div style={styles.left}>
          <p style={styles.text}>
            The <strong>SAKEC Auditorium</strong> stands as a modern venue for:
          </p>
          <ul style={styles.list}>
            <li>🎓 Guest lectures & academic seminars</li>
            <li>🎭 Cultural fests and talent shows</li>
            <li>🎥 Movie screenings and AV events</li>
            <li>🎤 Technical presentations & workshops</li>
          </ul>
          <p style={styles.text}>
            With advanced audio-visual systems and comfortable seating, the auditorium ensures every moment is impactful, professional, and memorable.
          </p>
        </div>
        <div style={styles.right}>
          <img
            src="/auditorium.png"
            alt="SAKEC Auditorium"
            style={styles.image}
          />
        </div>
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
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#e8f5e9',
    zIndex: 1
  },
  glow: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(-45deg, #e8f5e9, #a5d6a7, #e8f5e9)',
    backgroundSize: '600% 600%',
    animation: 'backgroundGlow 6s ease infinite',
    zIndex: -1
  },
  heading: {
    fontSize: '36px',
    marginBottom: '10px',
    color: '#1b5e20'
  },
  subheading: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '40px'
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    padding: '30px',
    maxWidth: '1100px',
    margin: 'auto',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px'
  },
  left: {
    flex: '1 1 500px'
  },
  right: {
    flex: '1 1 400px',
    textAlign: 'center'
  },
  image: {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  },
  text: {
    fontSize: '16px',
    color: '#333',
    lineHeight: 1.6,
    marginBottom: '20px'
  },
  list: {
    textAlign: 'left',
    paddingLeft: '20px',
    marginBottom: '20px',
    color: '#333',
    fontSize: '16px',
    lineHeight: 1.6
  },
  button: {
    marginTop: '50px',
    padding: '12px 24px',
    fontSize: '16px',
    background: '#388e3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};
