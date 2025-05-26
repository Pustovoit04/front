import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import CandidateList from '../components/CandidateList';
import VoteStats from '../components/VoteStats';
import {
  fetchCategories,
  fetchCandidatesByCategory,
  submitVote,
  checkIfVoted,
  fetchStats,
  fetchTopCandidate,
  fetchBottomCandidate,
  fetchRandomCategory,
} from '../api/voteApi';
import './VotePage.css';
import { useAuth } from '../context/AuthContext';

function VotePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [stats, setStats] = useState(null);
  const [topCandidate, setTopCandidate] = useState(null);
  const [bottomCandidate, setBottomCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [categoriesData, statsData, topData, bottomData] = await Promise.all([
          fetchCategories(),
          fetchStats(),
          fetchTopCandidate(),
          fetchBottomCandidate(),
        ]);
        setCategories(categoriesData);
        setStats(statsData);
        setTopCandidate(topData);
        setBottomCandidate(bottomData);
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
        setError('Не вдалося завантажити дані');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    try {
      const candidatesData = await fetchCandidatesByCategory(category.id);
      setCandidates(candidatesData);
      if (user) {
        const voted = await checkIfVoted(category.id);
        setHasVoted(voted);
      } else {
        setHasVoted(false);
      }
    } catch (error) {
      console.error('Помилка завантаження кандидатів:', error);
      setError('Не вдалося завантажити кандидатів');
    }
  };

  const handleVote = async (candidateId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (hasVoted) {
      alert('Ви вже голосували в цій категорії!');
      return;
    }
    try {
      await submitVote(selectedCategory.id, candidateId);
      setHasVoted(true);
      alert('Голос зараховано!');
      const [statsData, topData, bottomData] = await Promise.all([
        fetchStats(),
        fetchTopCandidate(),
        fetchBottomCandidate(),
      ]);
      setStats(statsData);
      setTopCandidate(topData);
      setBottomCandidate(bottomData);
    } catch (error) {
      console.error('Помилка голосування:', error);
      alert('Не вдалося надіслати голос: ' + error.message);
    }
  };

  const handleRandomCategory = async () => {
    if (categories.length === 0) return;
    try {
      const randomCategory = await fetchRandomCategory();
      handleCategorySelect(randomCategory);
    } catch (error) {
      console.error('Помилка вибору випадкової категорії:', error);
      setError('Не вдалося вибрати випадкову категорію');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Помилка виходу:', error);
      alert('Не вдалося вийти з системи');
    }
  };

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <div className="vote-container">
      <h1>Голосування</h1>
      {user ? (
        <>
          <p>
            Вітаємо, {user.name}!
            <button className="logout-button" onClick={handleLogout}>
              Вийти
            </button>
          </p>
          <button onClick={handleRandomCategory}>🎲 Випадкова категорія</button>
          <button onClick={() => navigate('/new-category')}>⚙️ Налаштування категорій</button>
          <CategoryList
            categories={categories}
            selected={selectedCategory}
            onSelect={handleCategorySelect}
          />
          {selectedCategory && (
            <CandidateList
              candidates={candidates}
              categoryName={selectedCategory.name}
              onVote={handleVote}
              hasVoted={hasVoted}
            />
          )}
          <VoteStats stats={stats} topCandidate={topCandidate} bottomCandidate={bottomCandidate} />
        </>
      ) : (
        <div>
          <p>Будь ласка, увійдіть, щоб проголосувати.</p>
          <button onClick={() => navigate('/login')}>Увійти</button>
        </div>
      )}
    </div>
  );
}

export default VotePage;