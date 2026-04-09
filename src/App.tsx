import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginationView from './pages/PaginationView';
import LoadMoreView from './pages/LoadMoreView';
import PokemonDetail from './pages/PokemonDetail';

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<PaginationView />} />
        <Route path="/load-more" element={<LoadMoreView />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
