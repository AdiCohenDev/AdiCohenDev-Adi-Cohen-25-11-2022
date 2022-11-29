import axios from "axios";

const apiKey = "cGwGfEmQJCUdnQeD1MgrwJFy8M4OKpwc";

const getCityKeyArea = async (currentCity: string) => {
  const res = await axios(
    `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${currentCity}`
  );
  return res.data;
};

const get5CityWeather = async (cityKeyArea: string) => {
  const res = await axios(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKeyArea}?apikey=${apiKey}`
  );
  return res.data;
};

const getGeoPositionLocation = async (position: GeolocationPosition) => {
  const coordinates = `${position.coords.latitude},${position.coords.longitude}`;
  const res = await axios(
    `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${coordinates}`
  );
  return res.data;
};

const getAutoCompleteSearchedCity = async (searchedCity: string) => {
  const res = await axios(
    `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${searchedCity}`
  );
  return res.data;
};

const getCurrentWeatherCondition = async (cityKeyArea: string) => {
  const res = await axios(
    `https://dataservice.accuweather.com/currentconditions/v1/${cityKeyArea}?apikey=${apiKey}`
  );
  return res.data;
};

export default {
  getCityKeyArea,
  get5CityWeather,
  getAutoCompleteSearchedCity,
  getCurrentWeatherCondition,
  getGeoPositionLocation,
};
