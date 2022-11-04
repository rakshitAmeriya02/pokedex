type CommonNameURL = {
  name: string;
  url: string;
};

interface Abilities {
  ability: CommonNameURL;
  is_hidden: boolean;
  slot: number;
}

interface VersionGroupDetails {
  level_learned_at: number;
  move_learn_method: CommonNameURL;
  version_group: CommonNameURL;
}

interface Move {
  move: CommonNameURL;
  version_group_details: VersionGroupDetails[];
}

interface Stats {
  base_stat: number;
  effort: number;
  stat: CommonNameURL;
}

interface Type {
  slot: number;
  type: CommonNameURL;
}

interface Sprites {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface Pokemon {
  abilities: Abilities[];
  base_experience: number;
  forms: CommonNameURL[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: [];
  species: CommonNameURL;
  sprites: Sprites;
  stats: Stats[];
  types: Type[];
  weight: number;
}

export interface CachedPokemons {
  [name: string]: {
    id: number;
    nickName: string;
    image: string;
    createdAt: Date;
  }[];
}

export interface SavedPokemon {
  id: number;
  createdAt: Date;
  name: string;
  nickName: string;
  image: string;
}
