// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VotePage from './pages/VotePage';
import LoginPage from './pages/LoginPage'; // якщо буде така сторінка
import NewCategoryPage from './pages/NewCategoryPage';

function App() {
  const [categories, setCategories] = useState([
    { id: 'cat1', name: 'Містер ФРЕКС' },
    { id: 'cat2', name: 'Міс ФРЕКС' },
    { id: 'cat3', name: 'Міс Конгеніальність' },
  ]);

  const addCategory = (newCat) => setCategories((prev) => [...prev, newCat]);
  const editCategory = (id, newName) =>
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, name: newName } : cat))
    );
  const deleteCategory = (id) =>
    setCategories((prev) => prev.filter((cat) => cat.id !== id));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<VotePage categories={categories} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/new-category"
          element={
            <NewCategoryPage
              categories={categories}
              onAddCategory={addCategory}
              onEditCategory={editCategory}
              onDeleteCategory={deleteCategory}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
