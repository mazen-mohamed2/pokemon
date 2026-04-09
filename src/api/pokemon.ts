import axios from 'axios';
import type { PokemonDetails } from '../types/pokemon';

const BASE_URL =  import.meta.env.VITE_API_URL;

export const fetchPokemonList = (limit: number, offset: number) =>
  axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

export const fetchPokemonDetails = (nameOrId: string) =>
  axios.get<PokemonDetails>(`${BASE_URL}/pokemon/${nameOrId}`);
