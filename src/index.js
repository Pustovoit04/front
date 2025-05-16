import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ⬇️ Імпортуємо контексти
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext'; // ⬅️ додай це

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider> {/* ⬅️ обгортаємо App ще одним провайдером */}
        <App />
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
