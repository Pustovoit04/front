import React from 'react';
import './VoteStats.css';

function VoteStats({ stats, topCandidate, bottomCandidate }) {
  // Перевірка, чи є дані для відображення
  if (!stats || !topCandidate || !bottomCandidate) {
    return <div className="vote-stats">Немає даних для відображення.</div>;
  }

  return (
    <div className="vote-stats">
      <h2>📊 Статистика голосування</h2>
      <div className="general-stats">
        <p>🔢 Кількість категорій: {stats.totalCategories}</p>
        <p>🗳️ Загальна кількість голосів: {stats.totalVotes}</p>
        {stats.topCategory ? (
          <p>
            🏆 Категорія з найбільшою кількістю голосів: <strong>{stats.topCategory.name}</strong> ({stats.topCategory.vote_count} голосів)
          </p>
        ) : (
          <p>⏳ Ще немає голосів</p>
        )}
      </div>

      <div className="candidate-stats">
        <h3>🌟 Топ-кандидат</h3>
        <p>
          <strong>{topCandidate.name}</strong> ({topCandidate.votes} голосів) - {topCandidate.category_name}
        </p>

        <h3>📉 Кандидат із найменшою кількістю голосів</h3>
        <p>
          <strong>{bottomCandidate.name}</strong> ({bottomCandidate.votes} голосів) - {bottomCandidate.category_name}
        </p>
      </div>
    </div>
  );
}

export default VoteStats;