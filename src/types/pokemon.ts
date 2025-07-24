export interface PokemonListItem {
    name: string;
    url: string;
  }
  
  export interface PokemonDetails {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
    };
    types: {
      type: {
        name: string;
      };
    }[];
    abilities: {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }[];
    stats: {
      base_stat: number;
      stat: {
        name: string;
        url: string;
      };
    }[];
  }
  