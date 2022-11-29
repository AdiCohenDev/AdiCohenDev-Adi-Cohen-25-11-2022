import styles from "./Weather.module.css";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import {
  select5DaysWeather,
  selectCurrentCity,
  selectCurrentWeather,
  selectIsCurrentCityInFavorites,
  selectIsLoading,
} from "../../store/weather/WeatherSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/favorites/FavoritesSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { format } from "date-fns";
import AutocompleteComponent from "./AutocompleteComponent";
import Degrees from "../../shared/components/Degrees";
import Loader from "../../shared/loader/Loader";
import { IFavoriteListItem } from "../../store/favorites/FavoritesTypes";
import WeatherDay from "./WeatherDay";
import { IUpcoming5DaysWeather } from "../../store/weather/WeatherTypes";

const Weather = () => {
  const dispatch = useAppDispatch();
  const currentWeatherData = useAppSelector(selectCurrentWeather);
  const _5DaysWeather = useAppSelector(select5DaysWeather);
  const currentCity = useAppSelector(selectCurrentCity);
  const isLoading = useAppSelector(selectIsLoading);
  const isInFavorites = useAppSelector(selectIsCurrentCityInFavorites);

  const addWeatherToFavorites = () => {
    if (currentWeatherData) {
      const data: IFavoriteListItem = {
        city: currentCity.city,
        degrees: currentWeatherData.temperature.metric.value,
        temperature: {
          value: currentWeatherData.temperature.imperial.value,
          unit: currentWeatherData.temperature.imperial.unit,
        },
        weatherCondition: currentWeatherData.weatherText,
        weatherIcon: currentWeatherData.weatherIcon,
        keyArea: currentCity.keyArea,
      };
      if (!isInFavorites) {
        dispatch(addToFavorites(data));
      }
    }
  };
  const removeWeatherFromFavorites = () => {
    dispatch(removeFromFavorites(currentCity));
  };

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.saveToFavoritesIcon}>
        {isInFavorites ? (
          <FavoriteIcon
            onClick={removeWeatherFromFavorites}
            fontSize={"inherit"}
            color={"inherit"}
          />
        ) : (
          <FavoriteBorderIcon
            onClick={addWeatherToFavorites}
            fontSize={"inherit"}
            color={"inherit"}
          />
        )}
      </div>
      <div className={styles.autoCompleteContainer}>
        <AutocompleteComponent />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.WeatherStatus}>
            {currentWeatherData ? (
              <>
                <div className={styles.dayDetails}>
                  {currentWeatherData.day} | {currentWeatherData.monthAndDate}
                </div>

                <div className={styles.mainWeatherDetails}>
                  {currentCity.city}
                </div>
                <div> {currentCity.country}</div>
                <div className={styles.mainWeatherDetails}>
                  <Degrees
                    temperature={currentWeatherData.temperature.imperial.value}
                    unit={currentWeatherData.temperature.imperial.unit}
                  />
                </div>
                <img
                  src={require(`.././../../public/icons/${currentWeatherData.weatherIcon}.png`)}
                  alt="weather icon"
                  height={100}
                  width={"auto"}
                />
                <div className={styles.mainWeatherDetails}>
                  {currentWeatherData.weatherText}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.upcomingDaysContainer}>
            <div className={styles.upcomingDaysWeather}>
              {_5DaysWeather ? (
                <>
                  {_5DaysWeather.map(
                    (city: IUpcoming5DaysWeather, index: number) => {
                      const date = new Date(city.date);
                      const day = format(date, "iiii");
                      return <WeatherDay day={day} city={city} key={index} />;
                    }
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
