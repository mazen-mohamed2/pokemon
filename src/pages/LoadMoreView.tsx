import { useEffect, useState } from 'react';
import { fetchPokemonList } from '../api/pokemon';
import PokemonCard from '../components/PokemonCard';
import LoadMoreButton from '../components/LoadMoreButton';
import Layout from '../components/Layout';
type PokemonApiResult = {
  name: string;
  url: string;
};
type SimplifiedPokemon = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function LoadMoreView() {
  const [pokemons, setPokemons] = useState<SimplifiedPokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadMore = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchPokemonList(10, offset);

      const simplified: SimplifiedPokemon[] = res.data.results.map((pokemon: PokemonApiResult) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        return {
          id,
          name: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });

      setPokemons(prev => [...prev, ...simplified]);
      setOffset(prev => prev + 10);
    } catch (err) {
      console.error(err);
      setError('Failed to load Pokémon. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <Layout>
      {error && (
        <div className="text-center text-red-600 mb-4">
          <p>{error}</p>
          <button
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
            onClick={loadMore}
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemons.map(p => (
          <PokemonCard key={p.id} id={p.id} name={p.name} imageUrl={p.imageUrl} />
        ))}
      </div>

      <LoadMoreButton onClick={loadMore} disabled={loading} />
    </Layout>
  );
}
