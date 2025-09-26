import React from 'react';

export default function ComputerCenter({ onBack }) {
  return (
    <div style={styles.container}>
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

      <h1 style={styles.heading}>💻 Computer Center</h1>
      <p style={styles.subheading}>
        A tech-powered space for learning, building, and exploring modern computing.
      </p>

      <div style={styles.card}>
        <div style={styles.left}>
          <p style={styles.text}>
            The <strong>SAKEC Computer Center</strong> serves as a nucleus of digital innovation. Designed to empower students with hands-on access to:
          </p>
          <ul style={styles.list}>
            <li>🖥️ High-performance workstations</li>
            <li>🌐 Dedicated internet connectivity</li>
            <li>🧠 Programming & Software Development</li>
            <li>🧪 Research and Projects</li>
            <li>📡 Online Learning Resources</li>
          </ul>
          <p style={styles.text}>
            Whether you're coding, compiling, or collaborating — the Computer Center is where ideas turn into innovation.
          </p>
        </div>
        <div style={styles.right}>
          <img
            src="/computercenter.png"
            alt="Computer Center"
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
    backgroundColor: '#f3e5f5',
    zIndex: 1
  },
  glow: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(-45deg, #f3e5f5, #ce93d8, #f3e5f5)',
    backgroundSize: '600% 600%',
    animation: 'backgroundGlow 6s ease infinite',
    zIndex: -1
  },
  heading: {
    fontSize: '36px',
    marginBottom: '10px',
    color: '#7b1fa2'
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
    background: '#7b1fa2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};
