import { Autocomplete, TextField } from "@mui/material";
import styles from "./Weather.module.css";
import { ICity } from "./CityTypes";
import {
  selectCityWeatherSearch,
  setCurrentCity,
} from "../../store/weather/WeatherSlice";
import {
  get5CityWeather,
  getAutoCompleteSearchedCity,
  getCurrentWeatherCondition,
} from "../../store/weather/WeatherThunk";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { ChangeEvent, HTMLAttributes, SyntheticEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const AutocompleteComponent = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchInputValid, setSearchInputValid] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const citiesList = useAppSelector(selectCityWeatherSearch);

  const _onChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const searchedCity = event.target.value;
    const isValid = /^[A-Za-z]*$/.test(searchedCity);
    setSearchInputValid(isValid);
    if (!isValid || !searchedCity) {
      return;
    }
    dispatch(getAutoCompleteSearchedCity(searchedCity));
  };

  const delayedSearch = useDebouncedCallback(_onChangeSearchInput, 250);

  const onInputChange = (
    event: SyntheticEvent<Element, Event>,
    city: ICity
  ) => {
    const cityName = city.city;
    setInputValue(cityName);
    dispatch(setCurrentCity(city));
    dispatch(get5CityWeather(city.keyArea));
    dispatch(getCurrentWeatherCondition(city.keyArea));
  };
  return (
    <Autocomplete
      onChange={(event: SyntheticEvent<Element, Event>, cityChoice) => {
        onInputChange(event, cityChoice as ICity);
      }}
      getOptionLabel={(city) => city.city}
      options={citiesList}
      groupBy={(option) => option.city.charAt(0)}
      sx={{ width: 300 }}
      renderOption={(props: HTMLAttributes<HTMLLIElement>, option) => {
        return (
          <li {...props}>
            <div className={styles.cityContainer}>
              <span className={styles.selectCity}>{option.city}</span>
              <span className={styles.selectCountry}>{option.country}</span>
            </div>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a city"
          onChange={delayedSearch}
          value={inputValue}
          error={!searchInputValid}
          helperText="English letters only"
        />
      )}
    />
  );
};

export default AutocompleteComponent;
