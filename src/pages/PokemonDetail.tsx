import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPokemonDetails } from '../api/pokemon';
import type { PokemonDetails } from '../types/pokemon';

type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

type PokemonAbility = {
  ability: {
    name: string;
  };
  is_hidden: boolean;
};

export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonDetails(id!)
      .then(res => setPokemon(res.data))
      .catch(() => alert("Failed to fetch Pokémon"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!pokemon) return <p className="p-6">Not found</p>;
  
  const getStatPercentage = (statValue: number) => {
    return Math.min(100, (statValue / 255) * 100);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-3xl font-bold mb-8 capitalize text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-5">⚡ {pokemon.name}</h1>
    
    <div className="flex flex-col md:flex-row md:items-start items-center gap-8">
      <div className="w-full md:w-1/3 flex justify-center">
        <div className="bg-gray-100 rounded-lg p-4 shadow-md">
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            className="w-64 h-64 object-contain mx-auto"
          />
        </div>
      </div>

        <div className="flex-grow">
          <h2 className="text-xl font-bold mb-2">Base Stats</h2>
          <ul className="space-y-2 mb-4">
            {pokemon.stats.map((stat: PokemonStat, index: number) => (
              <li key={index} className="flex items-center">
                <span className="w-24">{stat.stat.name === 'hp' ? 'HP' : 
                  stat.stat.name === 'special-attack' ? 'Sp. Attack' :
                  stat.stat.name === 'special-defense' ? 'Sp. Defense' :
                  stat.stat.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}</span>
                <span className="w-10 text-right mr-2">{stat.base_stat}</span>
                <div className="flex-grow h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-black" 
                    style={{ width: `${getStatPercentage(stat.base_stat)}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mb-2">Abilities</h2>
          <ul className="mb-4">
            {pokemon?.abilities.map((ability: PokemonAbility, index: number) => (
              <li key={index} className="mb-1">
                {ability.is_hidden ? (
                  <div>
                    <span className="font-bold">base</span>
                    <div>{ability.ability.name} (Hidden)</div>
                  </div>
                ) : (
                  <span>{ability.ability.name}</span>
                )}
              </li>
            ))}
          </ul>

          <h3 className="font-bold">Base Experience</h3>
          <p>{pokemon?.base_experience} XP</p>
        </div>
      </div>
    </div>
  );
}