import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import './NewCategoryPage.css';

function NewCategoryPage() {
  const navigate = useNavigate();
  const { categories, setCategories, candidates, setCandidates } = useData();

  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCatId, setSelectedCatId] = useState('');
  const [newName, setNewName] = useState('');

  const [newCandidateName, setNewCandidateName] = useState('');
  const [selectedCandidateToDelete, setSelectedCandidateToDelete] = useState('');

  const handleCreate = () => {
    if (!newCategoryName.trim()) return;
    const id = `cat${Date.now()}`;
    setCategories([...categories, { id, name: newCategoryName }]);
    setCandidates({ ...candidates, [id]: [] });
    setNewCategoryName('');
  };

  const handleDelete = () => {
    if (!selectedCatId) return;
    setCategories(categories.filter(c => c.id !== selectedCatId));
    const updated = { ...candidates };
    delete updated[selectedCatId];
    setCandidates(updated);
    setSelectedCatId('');
  };

  const handleRename = () => {
    if (!selectedCatId || !newName.trim()) return;
    setCategories(categories.map(c => c.id === selectedCatId ? { ...c, name: newName } : c));
    setNewName('');
  };

  const handleAddCandidate = () => {
    if (!selectedCatId || !newCandidateName.trim()) return;
    const newCandidate = {
      id: `cand${Date.now()}`,
      name: newCandidateName,
      votes: 0,
    };
    const updated = { ...candidates };
    updated[selectedCatId] = [...(updated[selectedCatId] || []), newCandidate];
    setCandidates(updated);
    setNewCandidateName('');
  };

  const handleDeleteCandidate = () => {
    if (!selectedCatId || !selectedCandidateToDelete) return;
    const updated = { ...candidates };
    updated[selectedCatId] = updated[selectedCatId].filter(c => c.id !== selectedCandidateToDelete);
    setCandidates(updated);
    setSelectedCandidateToDelete('');
  };

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
          {categories.map((cat) => (
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
              {(candidates[selectedCatId] || []).map((cand) => (
                <li key={cand.id}>{cand.name} — {cand.votes} голосів</li>
              ))}
            </ul>
            <select
              value={selectedCandidateToDelete}
              onChange={(e) => setSelectedCandidateToDelete(e.target.value)}
            >
              <option value="">-- Виберіть кандидата --</option>
              {(candidates[selectedCatId] || []).map((cand) => (
                <option key={cand.id} value={cand.id}>{cand.name}</option>
              ))}
            </select>
            <button onClick={handleDeleteCandidate}>🗑️ Видалити</button>
          </div>

          <div className="section">
            <button onClick={handleDelete}>❌ Видалити категорію</button>
          </div>
        </>
      )}
    </div>
  );
}

export default NewCategoryPage;
