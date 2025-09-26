import React from 'react';

export default function Gymnasium({ onBack }) {
  return (
    <div style={styles.container}>
      {/* 🔥 Gradient Background Animation */}
      <style>
        {`
          @keyframes pulseBackground {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div style={styles.animatedBackground}></div>

      <h1 style={styles.heading}>🏋️‍♀️ Gymnasium</h1>
      <p style={styles.subheading}>Empowering physical strength, discipline, and healthy habits</p>

      <div style={styles.card}>
        <div style={styles.textSection}>
          <p style={styles.text}>
            The <strong>SAKEC Gymnasium</strong> is a dedicated fitness zone that motivates students to embrace a healthier lifestyle. From cardiovascular workouts to strength training, the gym is equipped with state-of-the-art machines such as treadmills, cycling bikes, weight benches, and multi-gym stations.
          </p>
          <p style={styles.text}>
            Beyond its physical benefits, the gym encourages students to build consistency, resilience, and mental focus—values essential in both personal and professional life. Whether you're starting your fitness journey or an experienced athlete, the Gymnasium provides the right environment for all.
          </p>
          <p style={styles.text}>
            The facility remains accessible throughout the day, with instructors and fellow students forming a motivating fitness community within the campus.
          </p>
        </div>

        <img
          src="/gymnasium.png"
          alt="Gymnasium"
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
    textAlign: 'center',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    color: '#000'
  },
  animatedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(270deg, #ffe0b2, #ffcc80, #ffe0b2)',
    backgroundSize: '600% 600%',
    animation: 'pulseBackground 6s ease infinite',
    zIndex: -1
  },
  heading: {
    fontSize: '36px',
    color: '#e65100',
    marginBottom: '10px'
  },
  subheading: {
    fontSize: '18px',
    color: '#ef6c00',
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
    background: '#fb8c00',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
  }
};
