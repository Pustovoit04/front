import React from 'react';
import './AuthButtons.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AuthButtons() {
  const handleLogin = (provider) => {
    window.location.href = `${API_BASE_URL}/auth/${provider}`;
  };

  return (
    <div className="auth-buttons">
      <button onClick={() => handleLogin('google')}>Увійти через Google</button>
      <button onClick={() => handleLogin('github')}>Увійти через GitHub</button>
    </div>
  );
}

export default AuthButtons;
