import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from "./pokemonsSlice"

export type Reducer = {
  pokemon: {
    pokemons: {
      list: any[];
      count: number;
    };
    limit: number;
    offset: number;
  }
}

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
})