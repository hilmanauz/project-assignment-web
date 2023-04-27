import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: {
      list: [],
      count: 0,
    },
    limit: 9,
    offset: 1,
  },
  reducers: {
    setValue: (state, action) => {
      state.pokemons = action.payload
    },
    setLimit: (state, action) => {
      state.limit = action.payload
    },
    setOffset: (state, action) => {
      state.offset = action.payload
    },
  },
})

export const { setValue, setLimit, setOffset } = pokemonSlice.actions

export default pokemonSlice.reducer