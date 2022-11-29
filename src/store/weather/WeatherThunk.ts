import { createAsyncThunk } from "@reduxjs/toolkit";
import weatherAPI from "../../pages/weather/WeatherApi";
import { IApiCity } from "../../pages/weather/CityTypes";
import {
  _5DaysWeather,
  currentCityWeather,
  makeCity,
} from "../../pages/weather/City";
import first from "lodash-es/first";
import { toast } from "react-toastify";

export const get5CityWeather = createAsyncThunk(
  "weather/get5CityWeather",
  async (cityKeyArea: string, thunkAPI) => {
    try {
      const response = await weatherAPI.get5CityWeather(cityKeyArea);
      return _5DaysWeather(response.DailyForecasts);
    } catch (e) {
      toast("Failed to fetch 5 days weather", {
        hideProgressBar: true,
        position: "bottom-left",
      });
    }
  }
);
export const getCurrentWeatherCondition = createAsyncThunk(
  "weather/getCurrentWeatherCondition",
  async (cityKeyArea: string, thunkAPI) => {
    try {
      const response = await weatherAPI.getCurrentWeatherCondition(cityKeyArea);
      return currentCityWeather(response);
    } catch (e) {
      toast("Failed to fetch current city weather", {
        hideProgressBar: true,
        position: "bottom-left",
      });
    }
  }
);

export const getCityKeyArea = createAsyncThunk(
  "weather/getCitySearch",
  async (currentCity: string, thunkAPI) => {
    try {
      const response = await weatherAPI.getCityKeyArea(currentCity);
      return response[0].Key;
    } catch (e) {
      toast("Failed to fetch city key area", {
        hideProgressBar: true,
        position: "bottom-left",
      });
    }
  }
);

export const getAutoCompleteSearchedCity = createAsyncThunk(
  "weather/getAutoCompleteSearchedCity",
  async (searchedCity: string, thunkAPI) => {
    try {
      const response = await weatherAPI.getAutoCompleteSearchedCity(
        searchedCity
      );
      if (!response) return;
      return response.map((item: IApiCity) => {
        return makeCity(item);
      });
    } catch (e) {
      toast("Failed to fetch cities list", {
        hideProgressBar: true,
        position: "bottom-left",
      });
    }
  }
);
