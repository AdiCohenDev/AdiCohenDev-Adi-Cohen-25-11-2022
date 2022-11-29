import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";
import {
  get5CityWeather,
  getAutoCompleteSearchedCity,
  getCityKeyArea,
  getCurrentWeatherCondition,
} from "./WeatherThunk";
import { ICity, ICurrentWeather } from "../../pages/weather/CityTypes";
import { ICurrentCity, IUpcoming5DaysWeather } from "./WeatherTypes";

export const defaultCity = {
  city: "Tel Aviv",
  keyArea: "1057615",
  country: "Israel",
};

interface IWeatherState {
  currentCity: ICurrentCity;
  upcoming5DaysWeather: IUpcoming5DaysWeather[];
  cities: ICity[];
  currentWeather: ICurrentWeather | null;
  isLoading: boolean;
}

const initialState: IWeatherState = {
  currentCity: {} as ICurrentCity,
  upcoming5DaysWeather: [],
  cities: [],
  isLoading: true,
  currentWeather: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCurrentCity: (state, { payload }) => {
      state.currentCity = {
        city: payload.city,
        keyArea: payload.keyArea,
        country: payload.country,
      };
      localStorage.setItem("currentCity", JSON.stringify(state.currentCity));
    },
    setCities: (state, { payload }: PayloadAction<ICity[]>) => {
      state.cities = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get5CityWeather.fulfilled, (state, { payload }) => {
      if (payload) {
        state.upcoming5DaysWeather = payload;
      }
    });
    builder.addCase(get5CityWeather.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentWeatherCondition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentWeatherCondition.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      getCurrentWeatherCondition.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.currentWeather = payload;
        }
        state.isLoading = false;
      }
    );
    builder.addCase(getCityKeyArea.fulfilled, (state, { payload }) => {
      state.currentCity.keyArea = payload;
    });
    builder.addCase(
      getAutoCompleteSearchedCity.fulfilled,
      (state, { payload }) => {
        state.cities = payload;
      }
    );
  },
});

export const { setCurrentCity, setCities } = weatherSlice.actions;

export const select5DaysWeather = (state: RootState) =>
  state.weather.upcoming5DaysWeather;
export const selectCurrentWeather = (state: RootState) =>
  state.weather.currentWeather;
export const selectCurrentCity = (state: RootState) =>
  state.weather.currentCity;
export const selectIsLoading = (state: RootState) => state.weather.isLoading;
export const selectIsCurrentCityInFavorites = (state: RootState) => {
  return state.favorites.list.find(
    (favoriteItem) => favoriteItem.city === state.weather.currentCity.city
  );
};
export const selectCityWeatherSearch = (state: RootState) => {
  if (!state.weather.cities) return [];
  return [...state.weather.cities].sort(sortCityByFirstLetter);
};

function sortCityByFirstLetter(a: ICity, b: ICity) {
  return -b.city.charAt(0).localeCompare(a.city.charAt(0));
}

export default weatherSlice.reducer;
