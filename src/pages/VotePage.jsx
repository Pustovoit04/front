import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import CategoryList from '../components/CategoryList';
import CandidateList from '../components/CandidateList';
import VoteStats from '../components/VoteStats';
import '../pages/VotePage.css';

function VotePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { categories, candidates, setCandidates } = useData();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [votes, setVotes] = useState({});

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleVote = (candidateId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (votes[selectedCategory.id]) {
      alert('Ви вже голосували в цій категорії!');
      return;
    }

    setVotes((prev) => ({
      ...prev,
      [selectedCategory.id]: candidateId,
    }));

    setCandidates((prev) => {
      const updated = { ...prev };
      updated[selectedCategory.id] = updated[selectedCategory.id].map((cand) =>
        cand.id === candidateId ? { ...cand, votes: cand.votes + 1 } : cand
      );
      return updated;
    });
  };

  const handleRandomCategory = () => {
    const random = categories[Math.floor(Math.random() * categories.length)];
    setSelectedCategory(random);
  };

  return (
    <div className="vote-container">
      <h1>Голосування</h1>
      <button onClick={handleRandomCategory}>🎲 Випадкова категорія</button>
      <button onClick={() => navigate('/new-category')}>⚙️ Налаштування категорій</button>

      <CategoryList
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
      />

      {selectedCategory && (
        <CandidateList
          candidates={candidates[selectedCategory.id] || []}
          categoryName={selectedCategory.name}
          onVote={handleVote}
          hasVoted={!!votes[selectedCategory.id]}
        />
      )}

      <VoteStats categories={categories} candidates={candidates} />
    </div>
  );
}

export default VotePage;
