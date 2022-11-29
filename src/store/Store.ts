import { configureStore } from "@reduxjs/toolkit";
import { favoritesSlice } from "./favorites/FavoritesSlice";
import { weatherSlice } from "./weather/WeatherSlice";
import { userPreferencesSlice } from "./user-preferences/UserPreferencesSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    weather: weatherSlice.reducer,
    userPreferences: userPreferencesSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
