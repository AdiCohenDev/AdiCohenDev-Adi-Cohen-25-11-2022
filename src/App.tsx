import React, { useEffect } from "react";
import "./Index.css";
import Weather from "./pages/weather/Weather";
import Favorites from "./pages/favorites/Favorite";
import Nav from "./pages/nav/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "./store/Hooks";
import { selectAppTheme } from "./store/user-preferences/UserPreferencesSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import weatherApi from "./pages/weather/WeatherApi";
import {
  get5CityWeather,
  getCurrentWeatherCondition,
} from "./store/weather/WeatherThunk";
import { setCurrentCity } from "./store/weather/WeatherSlice";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const currentTheme = useAppSelector(selectAppTheme);
  const dispatch = useAppDispatch();

  const locationSuccessCallback = async (position: GeolocationPosition) => {
    const res = await weatherApi.getGeoPositionLocation(position);
    const localUserCity = {
      city: res.AdministrativeArea.LocalizedName,
      keyArea: res.Key,
      country: res.Country.LocalizedName,
    };
    if (res) {
      dispatch(setCurrentCity(localUserCity));
      dispatch(getCurrentWeatherCondition(res.Key));
      dispatch(get5CityWeather(res.Key));
    }
  };
  const defaultCity = {
    city: "Tel Aviv",
    keyArea: "1057615",
    country: "Israel",
  };
  const locationErrorCallback = () => {
    dispatch(setCurrentCity(defaultCity));
    dispatch(getCurrentWeatherCondition(defaultCity.keyArea));
    dispatch(get5CityWeather(defaultCity.keyArea));

    return toast(
      "Failed to fetch your city weather, we are setting the default city",
      {
        hideProgressBar: true,
        position: "bottom-left",
      }
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        locationSuccessCallback,
        locationErrorCallback
      );
    } else {
      dispatch(setCurrentCity(defaultCity));
      dispatch(getCurrentWeatherCondition(defaultCity.keyArea));
      dispatch(get5CityWeather(defaultCity.keyArea));
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Weather />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
