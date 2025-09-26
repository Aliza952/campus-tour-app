import React from 'react';

export default function IndoorSportsFacilities({ onBack }) {
  return (
    <div style={styles.container}>
      {/* 🎨 Gradient Background Animation */}
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

      <h1 style={styles.heading}>🏸 Indoor Sports Facilities</h1>
      <p style={styles.subheading}>Where recreation and fitness go hand in hand</p>

      <div style={styles.card}>
        <div style={styles.textSection}>
          <p style={styles.text}>
            At <strong>SAKEC</strong>, the Indoor Sports Facilities are designed to help students recharge, compete, and collaborate in a spirit of wellness and camaraderie. This fully-equipped area provides dedicated spaces for games like badminton, table tennis, chess, and carrom.
          </p>
          <p style={styles.text}>
            The facilities are maintained to professional standards, ensuring a safe and enjoyable experience for all participants. Whether it's a quick friendly match or a scheduled tournament, students regularly take part in healthy recreation and team-building activities.
          </p>
          <p style={styles.text}>
            Beyond just physical activity, these indoor zones promote mental agility, social interaction, and time management—skills vital to overall personal growth.
          </p>
        </div>

        <img
          src="/indoorsportsfacilities.png"
          alt="Indoor Sports Facilities"
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
  glowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(270deg, #e0f7fa, #b2ebf2, #80deea)',
    backgroundSize: '600% 600%',
    animation: 'glowAnimation 6s ease infinite',
    zIndex: -1
  },
  heading: {
    fontSize: '36px',
    color: '#00695c',
    marginBottom: '10px'
  },
  subheading: {
    fontSize: '18px',
    color: '#00897b',
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
    background: '#00796b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
  }
};
