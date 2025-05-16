// src/context/DataContext.js
import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    { id: 'cat1', name: 'Містер ФРЕКС' },
    { id: 'cat2', name: 'Міс ФРЕКС' },
    { id: 'cat3', name: 'Міс Конгеніальність' },
  ]);

  const [candidates, setCandidates] = useState({
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
  });

  return (
    <DataContext.Provider value={{ categories, setCategories, candidates, setCandidates }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
