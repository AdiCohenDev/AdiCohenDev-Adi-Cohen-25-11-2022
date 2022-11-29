import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../Store";
import { IFavoritesState } from "./FavoritesTypes";

const favoritesListJson = localStorage.getItem("favoritesList");
const favoritesListFromLocalStorage =
  favoritesListJson !== null ? JSON.parse(favoritesListJson) : [];

const initialState: IFavoritesState = {
  list: favoritesListFromLocalStorage,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, { payload }) => {
      state.list.push(payload);
      localStorage.setItem("favoritesList", JSON.stringify(state.list));
    },
    removeFromFavorites: (state, { payload }) => {
      state.list = state.list.filter(
        (listItem) => listItem.city !== payload.city
      );
      localStorage.setItem("favoritesList", JSON.stringify(state.list));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.list;

export default favoritesSlice.reducer;
