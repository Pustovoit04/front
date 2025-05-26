import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  fetchCategories,
  fetchCandidatesByCategory,
  createCategory,
  updateCategory,
  createCandidate,
  deleteCategory,
  deleteCandidate,
} from '../api/voteApi';
import './NewCategoryPage.css';

function NewCategoryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [categories, setCategories] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newName, setNewName] = useState('');
  const [newCandidateName, setNewCandidateName] = useState('');
  const [selectedCandidateToDelete, setSelectedCandidateToDelete] = useState('');
  const [error, setError] = useState(null);

  // Завантажуємо категорії при завантаженні компонента
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCategories()
      .then(setCategories)
      .catch(() => setError('Не вдалося завантажити категорії'));
  }, [user, navigate]);

  // При зміні вибраної категорії завантажуємо кандидатів
  useEffect(() => {
    if (!selectedCatId) {
      setCandidates([]);
      return;
    }
    fetchCandidatesByCategory(selectedCatId)
      .then(setCandidates)
      .catch(() => setError('Не вдалося завантажити кандидатів'));
  }, [selectedCatId]);

  // Після створення категорії оновлюємо список
  const handleCreate = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!newCategoryName.trim()) {
      setError('Назва категорії не може бути порожньою');
      return;
    }
    try {
      await createCategory({ name: newCategoryName });
      setNewCategoryName('');
      setError(null);
      const updatedCategories = await fetchCategories();
      setCategories(updatedCategories);
    } catch {
      setError('Не вдалося створити категорію');
    }
  };

  // Після редагування категорії оновлюємо список
  const handleRename = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!selectedCatId || !newName.trim()) {
      setError('Оберіть категорію та введіть нову назву');
      return;
    }
    try {
      await updateCategory(selectedCatId, { name: newName });
      setNewName('');
      setError(null);
      const updatedCategories = await fetchCategories();
      setCategories(updatedCategories);
    } catch {
      setError('Не вдалося оновити назву категорії');
    }
  };

  // Після додавання кандидата оновлюємо список кандидатів
  const handleAddCandidate = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!selectedCatId || !newCandidateName.trim()) {
      setError('Оберіть категорію та введіть ім’я кандидата');
      return;
    }
    try {
      await createCandidate(selectedCatId, { name: newCandidateName });
      setNewCandidateName('');
      setError(null);
      const updatedCandidates = await fetchCandidatesByCategory(selectedCatId);
      setCandidates(updatedCandidates);
    } catch {
      setError('Не вдалося додати кандидата');
    }
  };

  // Після видалення категорії оновлюємо список категорій
  const handleDelete = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!selectedCatId) {
      setError('Оберіть категорію для видалення');
      return;
    }
    try {
      await deleteCategory(selectedCatId);
      setSelectedCatId('');
      setError(null);
      const updatedCategories = await fetchCategories();
      setCategories(updatedCategories);
      setCandidates([]);
    } catch {
      setError('Не вдалося видалити категорію');
    }
  };

  // Після видалення кандидата оновлюємо список кандидатів
  const handleDeleteCandidate = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!selectedCatId || !selectedCandidateToDelete) {
      setError('Оберіть кандидата для видалення');
      return;
    }
    try {
      await deleteCandidate(selectedCatId, selectedCandidateToDelete);
      setSelectedCandidateToDelete('');
      setError(null);
      const updatedCandidates = await fetchCandidatesByCategory(selectedCatId);
      setCandidates(updatedCandidates);
    } catch {
      setError('Не вдалося видалити кандидата');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="category-settings-container">
      <h2>Налаштування категорій</h2>
      <button className="back-button" onClick={() => navigate('/')}>⬅️ Назад</button>

      <div className="section">
        <h3>Створити нову категорію</h3>
        <input
          type="text"
          placeholder="Назва категорії"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleCreate}>➕ Створити</button>
      </div>

      <div className="section">
        <h3>Оберіть категорію</h3>
        <select value={selectedCatId} onChange={(e) => setSelectedCatId(e.target.value)}>
          <option value="">-- Виберіть категорію --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {selectedCatId && (
        <>
          <div className="section">
            <h3>Редагувати назву категорії</h3>
            <input
              type="text"
              placeholder="Нова назва"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleRename}>✏️ Зберегти</button>
          </div>

          <div className="section">
            <h3>Додати кандидата</h3>
            <input
              type="text"
              placeholder="Ім'я кандидата"
              value={newCandidateName}
              onChange={(e) => setNewCandidateName(e.target.value)}
            />
            <button onClick={handleAddCandidate}>➕ Додати</button>
          </div>

          <div className="section">
            <h3>Існуючі кандидати</h3>
            <ul>
              {candidates.map(c => (
                <li key={c.id}>{c.name}</li>
              ))}
            </ul>
            <select
              value={selectedCandidateToDelete}
              onChange={(e) => setSelectedCandidateToDelete(e.target.value)}
            >
              <option value="">-- Виберіть кандидата --</option>
              {candidates.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <button onClick={handleDeleteCandidate}>🗑️ Видалити</button>
          </div>

          <div className="section">
            <button onClick={handleDelete}>❌ Видалити категорію</button>
          </div>
        </>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default NewCategoryPage;
