import React from 'react';

function CandidateList({ candidates, categoryName, onVote, hasVoted }) {
  return (
    <div className="category-list">
    <div className="candidate-card">
      <h3>Кандидати в категорії: {categoryName}</h3>
      {candidates.length === 0 && <p>Немає кандидатів</p>}
      {candidates.map((cand) => (
        <div key={cand.id} style={{ margin: '8px 0' }}>
          <strong>{cand.name}</strong> – {cand.votes} голосів
          <button
            style={{ marginLeft: '10px' }}
            onClick={() => onVote(cand.id)}
            disabled={hasVoted}
          >
            {hasVoted ? 'Голос вже подано' : 'Проголосувати'}
          </button>
        </div>
      ))}
    </div>
</div>
  );
}

export default CandidateList;
