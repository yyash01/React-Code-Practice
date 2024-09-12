import { useState } from 'react';
import useDebounce from './useDebounce.jsx';
import useDebounceGeneric from './useDebounceGeneric.jsx';

import './App.css';

function App() {
  const [search, setSearch] = useState('');
  // const debounceSearchText = useDebounce(search, 1000);
  const debounceSearchText = useDebounceGeneric(search, 1000);
  return (
    <div className="app">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <hr />
      <h2> Normal Search Text : {search} </h2>
      <hr />
      <h2> Debounce Search Text : {debounceSearchText} </h2>
    </div>
  );
}

export default App;
