import React from 'react';

export default function Laboratories({ onBack }) {
  return (
    <div style={styles.container}>
      {/* Glowing Background Animation */}
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

      <h1 style={styles.heading}>🧪 Laboratories</h1>
      <p style={styles.subheading}>
        Fostering innovation through hands-on learning, experimentation, and technical excellence
      </p>

      <div style={styles.card}>
        <div style={styles.left}>
          <p style={styles.text}>
            The laboratories at <strong>SAKEC</strong> are essential hubs for scientific exploration and engineering innovation. Each lab is thoughtfully equipped to support a wide range of practical sessions across disciplines like:
          </p>
          <ul style={styles.list}>
            <li>🔌 Electronics and Circuit Design Labs</li>
            <li>⚙️ Embedded Systems & Microcontrollers</li>
            <li>🔬 Physics Labs for foundational concepts</li>
            <li>💻 Programming & Networking Labs</li>
            <li>🧪 Instrumentation and Control Labs</li>
          </ul>
          <p style={styles.text}>
            These well-maintained facilities foster critical thinking, creativity, and hands-on problem-solving, helping students bridge the gap between theory and real-world application.
          </p>
        </div>
        <div style={styles.right}>
          <img
            src="/laboratories.png"
            alt="SAKEC Laboratories"
            style={styles.image}
          />
        </div>
      </div>

      <button onClick={onBack} style={styles.button}>← Back to Place Selection</button>
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
    backgroundColor: '#fff3e0',
    zIndex: 1
  },
  glow: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(-45deg, #fff3e0, #ffe0b2, #ffe082)',
    backgroundSize: '600% 600%',
    animation: 'backgroundGlow 6s ease infinite',
    zIndex: -1
  },
  heading: {
    fontSize: '36px',
    marginBottom: '10px',
    color: '#e65100'
  },
  subheading: {
    fontSize: '18px',
    color: '#444',
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
    background: '#ef6c00',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};
