import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthButtons from '../components/AuthButtons';
import './LoginPage.css';

function LoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

useEffect(() => {
  if (!loading && user) {
    navigate('/vote'); // редірект на голосування після логіну
  }
}, [user, loading, navigate]);


  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (user) {
    return null;
  }

  return (
    <div className="login-container">
      <h1>Сторінка входу</h1>
      <p>Увійдіть через одну з соціальних мереж:</p>
      <AuthButtons />
    </div>
  );
}

export default LoginPage;