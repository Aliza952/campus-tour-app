import React from 'react';

export default function GirlsCommonRoom({ onBack }) {
  return (
    <div style={styles.container}>
      {/* 🌸 Animated Background */}
      <style>
        {`
          @keyframes floatGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div style={styles.animatedBackground}></div>

      <h1 style={styles.heading}>👩‍🎓 Girls' Common Room</h1>
      <p style={styles.subheading}>
        A peaceful and private space designed for comfort, relaxation, and community.
      </p>

      <div style={styles.card}>
        <div style={styles.textSection}>
          <p style={styles.text}>
            The <strong>Girls’ Common Room</strong> at <strong>SAKEC</strong> is a thoughtfully designed sanctuary for our female students. It offers a cozy, secure space to relax, catch up with friends, or enjoy a quiet moment during the day.
          </p>
          <p style={styles.text}>
            This room includes basic amenities like seating, fans, soft lighting, and calm decor. It’s more than just a room — it’s a safe haven that encourages well-being, community bonding, and a sense of belonging.
          </p>
          <p style={styles.text}>
            SAKEC believes in fostering an inclusive and respectful environment. The Girls' Common Room reflects that philosophy by offering comfort, privacy, and peace to recharge and thrive.
          </p>
        </div>

        <img
          src="/girlscommonroom.png"
          alt="Girls Common Room"
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
    background: 'linear-gradient(270deg, #fce4ec, #f8bbd0, #fce4ec)',
    backgroundSize: '600% 600%',
    animation: 'floatGradient 6s ease infinite',
    zIndex: -1
  },
  heading: {
    fontSize: '36px',
    color: '#880e4f',
    marginBottom: '10px'
  },
  subheading: {
    fontSize: '18px',
    color: '#ad1457',
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
    background: '#d81b60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
  }
};
