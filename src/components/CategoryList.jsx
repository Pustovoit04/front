import React from 'react';

function CategoryList({ categories, selected, onSelect }) {
  return (
    <div>
      <h2>Категорії</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              style={{ fontWeight: selected?.id === cat.id ? 'bold' : 'normal' }}
              onClick={() => onSelect(cat)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
