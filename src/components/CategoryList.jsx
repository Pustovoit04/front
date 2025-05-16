import React from 'react';

function CategoryList({ categories, selected, onSelect }) {
  return (
    <div>
      <h2>Категорії</h2>
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${selected?.id === category.id ? 'active' : ''}`}
            onClick={() => onSelect(category)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;