// src/components/VoteStats.jsx
import React from 'react';
import './VoteStats.css';

function VoteStats({ categories, candidates }) {
  if (!categories.length || !Object.keys(candidates).length) {
    return <div className="vote-stats">Немає даних для відображення.</div>;
  }

  return (
    <div className="vote-stats">
      <h2>📊 Статистика голосування</h2>
      {categories.map((category) => {
        const candList = candidates[category.id] || [];
        const totalVotes = candList.reduce((sum, c) => sum + c.votes, 0);
        const topCandidate = candList.reduce((top, c) => (c.votes > (top?.votes || 0) ? c : top), null);

        return (
          <div key={category.id} className="category-stat">
            <h3>{category.name}</h3>
            <p>🔢 Загальна кількість голосів: {totalVotes}</p>
            {topCandidate ? (
              <p>🏆 Лідер: <strong>{topCandidate.name}</strong> ({topCandidate.votes} голосів)</p>
            ) : (
              <p>⏳ Ще ніхто не голосував</p>
            )}
            <ul>
              {candList.map((cand) => (
                <li key={cand.id}>
                  {cand.name}: {cand.votes} голосів
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default VoteStats;

