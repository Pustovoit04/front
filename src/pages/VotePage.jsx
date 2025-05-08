import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // треба мати AuthContext
import CategoryList from '../components/CategoryList';
import CandidateList from '../components/CandidateList';
import VoteStats from '../components/VoteStats';

function VotePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [candidates, setCandidates] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [votes, setVotes] = useState({}); // ключ: categoryId, значення: candidateId

  useEffect(() => {
    // імітація API-запиту
    const mockData = {
      categories: [
        { id: 'cat1', name: 'Містер ФРЕКС' },
        { id: 'cat2', name: 'Міс ФРЕКС' },
        { id: 'cat3', name: 'Міс Конгеніальність' },
      ],
      candidates: {
        cat1: [
          { id: 'c1', name: 'Олександр', votes: 4 },
          { id: 'c2', name: 'Іван', votes: 6 },
        ],
        cat2: [
          { id: 'c3', name: 'Марія', votes: 10 },
          { id: 'c4', name: 'Олена', votes: 3 },
        ],
        cat3: [
          { id: 'c5', name: 'Тетяна', votes: 5 },
        ],
      },
    };

    setCategories(mockData.categories);
    setCandidates(mockData.candidates);
  }, []);

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

    // "Голосування" — локальне збереження
    setVotes((prev) => ({
      ...prev,
      [selectedCategory.id]: candidateId,
    }));

    // +1 до кількості голосів у кандидатів
    setCandidates((prev) => {
      const updated = { ...prev };
      const list = updated[selectedCategory.id].map((cand) =>
        cand.id === candidateId ? { ...cand, votes: cand.votes + 1 } : cand
      );
      updated[selectedCategory.id] = list;
      return updated;
    });
  };

  const handleRandomCategory = () => {
    const random = categories[Math.floor(Math.random() * categories.length)];
    setSelectedCategory(random);
  };

  return (
    <div>
      <h1>Голосування</h1>

      <button onClick={handleRandomCategory}>🎲 Випадкова категорія</button>

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
