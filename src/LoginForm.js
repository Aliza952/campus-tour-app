import React, { useState } from 'react';
import './LoginForm.css';

export default function LoginForm({ onLogin }) {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('registeredUsers');
    return saved ? JSON.parse(saved) : {};
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [prn, setPrn] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      alert('Username is required');
      return;
    }

    if (!password && !isRegistering) {
      alert('Password is required');
      return;
    }

    if (isRegistering) {
      if (!password || !email || !mobile || !prn || !dob) {
        alert('Please fill all registration fields');
        return;
      }
      if (users[username]) {
        alert('Username already exists!');
      } else {
        const newUser = { password, email, mobile, prn, dob };
        const updated = { ...users, [username]: newUser };
        localStorage.setItem('registeredUsers', JSON.stringify(updated));
        setUsers(updated);
        alert('🎉 Registered successfully!');
        setIsRegistering(false);
        resetFields();
      }
    } else {
      if (!users[username]) {
        alert('User not found. Please register.');
      } else if (users[username].password !== password) {
        alert('Incorrect password.');
      } else {
        localStorage.setItem('lastUser', username);
        onLogin(username);
      }
    }
  };

  const resetFields = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setMobile('');
    setPrn('');
    setDob('');
  };

  const handleForgotPassword = () => {
    const enteredUsername = prompt('Enter your username to recover password:');
    if (!enteredUsername) return;

    const user = users[enteredUsername];
    if (user) {
      alert(`Your password is: ${user.password}`);
    } else {
      alert('Username not found.');
    }
  };

  const headerText = 'Metaverse Campus';

  return (
    <div style={styles.wrapper}>
      <video
        className="bg-video"
        src="/videos/futuree.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div style={styles.backgroundOverlay} />
      <div style={{ ...styles.container, flexDirection: isRegistering ? 'row' : 'column' }}>
        {isRegistering ? (
          <div style={styles.infoPanel}>
            <h1 style={{ ...styles.pageHeader, ...styles.pageHeaderLeft }}>
              <span style={{ marginRight: 8 }}>🏫</span>
              {headerText.split('').map((char, i) => (
                <span key={i} className="letter" style={{ animationDelay: `${i * 0.05}s` }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
            <p style={styles.welcome}>
              Welcome to the virtual campus! Register to explore your college from anywhere. 🎓
            </p>
          </div>
        ) : (
          <h1 style={styles.pageHeader}>
            <span style={{ marginRight: 8 }}>🏫</span>
            {headerText.split('').map((char, i) => (
              <span key={i} className="letter" style={{ animationDelay: `${i * 0.05}s` }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        )}

        <div style={styles.card}>
          <h2 style={styles.heading}>
            <span style={{ color: '#fff' }}>
              {isRegistering ? '📝 Register Account' : '🚀 Welcome Back'}
            </span>
          </h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputWrapper}>
              <span style={styles.icon}>👤</span>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.inputWrapper}>
              <span style={styles.icon}>🔒</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>

            {!isRegistering && (
              <div style={{ textAlign: 'right', marginTop: '-10px' }}>
                <button type="button" style={styles.forgotLink} onClick={handleForgotPassword}>
                  Forgot Password?
                </button>
              </div>
            )}

            {isRegistering && (
              <>
                <div style={styles.inputWrapper}>
                  <span style={styles.icon}>📧</span>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputWrapper}>
                  <span style={styles.icon}>📱</span>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputWrapper}>
                  <span style={styles.icon}>🆔</span>
                  <input
                    type="text"
                    placeholder="PRN Number"
                    value={prn}
                    onChange={(e) => setPrn(e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputWrapper}>
                  <span style={styles.icon}>🎂</span>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    style={styles.input}
                  />
                </div>
              </>
            )}

            <button type="submit" style={styles.button}>
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          <p style={{ marginTop: '12px', color: '#9beefc' }}>
            {isRegistering ? 'Already have an account?' : 'New user?'}{' '}
            <button
              style={styles.link}
              onClick={() => {
                setIsRegistering(!isRegistering);
                resetFields();
              }}
            >
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: `'Segoe UI', sans-serif`,
    width: '100vw',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 20, 0.5)',
    zIndex: 1,
  },
  container: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    gap: '60px',
    width: '90%',
    maxWidth: '1100px',
    alignItems: 'center',
    transition: 'all 0.4s ease',
  },
  infoPanel: {
    flex: 1,
    color: 'white',
    padding: '20px',
  },
  pageHeader: {
    fontSize: '38px',
    fontWeight: 'bold',
    color: '#ffffff',
    zIndex: 2,
    display: 'flex',
    gap: '1px',
    textShadow: '0 0 12px rgba(255, 255, 255, 0.8)',
    animation: 'glowPulse 2s ease-in-out infinite alternate',
    textAlign: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  pageHeaderLeft: {
    textAlign: 'left',
    fontSize: '42px',
    flexWrap: 'wrap',
  },
  welcome: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#a2e4f5',
    marginTop: '20px',
  },
  card: {
    flex: 1,
    background: 'rgba(0, 32, 64, 0.6)',
    border: '1px solid rgba(0, 200, 255, 0.2)',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '450px',
    width: '100%',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 0 24px rgba(0, 255, 255, 0.2)',
    textAlign: 'center',
    color: '#ffffff',
  },
  heading: {
    fontSize: '26px',
    marginBottom: '20px',
    color: '#ffffff',
    textShadow: '0 0 10px rgba(0,255,255,0.5)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '16px',
    color: '#00cfff',
  },
  input: {
    width: '100%',
    padding: '12px 12px 12px 36px',
    borderRadius: '8px',
    border: '1px solid #00cfff',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#fff',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: '0.3s ease',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #00eaff',
    backgroundColor: '#00cfff',
    color: '#000',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(0,255,255,0.6)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#66fcf1',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    textDecoration: 'underline',
  },
  forgotLink: {
    background: 'none',
    border: 'none',
    color: '#ffa726',
    cursor: 'pointer',
    fontSize: '13px',
    textDecoration: 'underline',
    padding: 0,
    marginBottom: '8px',
  },
};
