import { useEffect, useState, useCallback } from 'react';
import { fetchPokemonList } from '../api/pokemon';
import PokemonCard from '../components/PokemonCard';
import PaginationControls from '../components/PaginationControls';
import Layout from '../components/Layout';

type SimplifiedPokemon = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function PaginationView() {
  const [pokemons, setPokemons] = useState<SimplifiedPokemon[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const itemsPerPage = 20;

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const offset = page * itemsPerPage;
      const res = await fetchPokemonList(itemsPerPage, offset);
  
      const simplified: SimplifiedPokemon[] = res.data.results.map((pokemon: { name: string; url: string }) => {
        const id = Number(pokemon.url.split('/').filter(Boolean).pop());
        return {
          id,
          name: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });
  
      setPokemons(simplified);
      setTotalCount(res.data.count);
    } catch (err) {
      console.error(err);
      setError('Failed to load Pokémon. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page]);
  

  useEffect(() => {
    loadData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loadData]);
  

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleNext = useCallback(() => {
    setPage(prev => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    setPage(prev => Math.max(prev - 1, 0));
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return (
    <Layout>
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      )}

      {error && (
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
            onClick={loadData}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pokemons.map(pokemon => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                imageUrl={pokemon.imageUrl}
              />
            ))}
          </div>

          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            onPrev={handlePrev}
            onNext={handleNext}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Layout>
  );
}
