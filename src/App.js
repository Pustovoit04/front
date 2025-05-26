import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VotePage from './pages/VotePage';
import LoginPage from './pages/LoginPage';
import NewCategoryPage from './pages/NewCategoryPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Завантаження...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/vote"
          element={user ? <VotePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/new-category"
          element={user ? <NewCategoryPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/vote" />}
        />
        <Route path="*" element={<Navigate to={user ? '/vote' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;