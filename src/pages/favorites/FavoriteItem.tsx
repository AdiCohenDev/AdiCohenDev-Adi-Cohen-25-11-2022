import styles from "./Favorite.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Degrees from "../../shared/components/Degrees";
import { useAppDispatch } from "../../store/Hooks";
import { removeFromFavorites } from "../../store/favorites/FavoritesSlice";
import { useNavigate } from "react-router-dom";
import { IFavoriteListItem } from "../../store/favorites/FavoritesTypes";
import { setCurrentCity } from "../../store/weather/WeatherSlice";
import {
  get5CityWeather,
  getCurrentWeatherCondition,
} from "../../store/weather/WeatherThunk";

interface IProps {
  city: IFavoriteListItem;
}
const FavoriteItem = (props: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const setDefaultCityToUserChoice = (item: IFavoriteListItem) => {
    dispatch(setCurrentCity(item));
    dispatch(get5CityWeather(item.keyArea));
    dispatch(getCurrentWeatherCondition(item.keyArea));
    navigate("/");
  };

  const removeDataFromFavorites = (city: IFavoriteListItem) => {
    dispatch(removeFromFavorites(city));
  };
  return (
    <>
      <div className={styles.cityWeather}>
        <DeleteIcon
          className={styles.deleteIcon}
          onClick={() => removeDataFromFavorites(props.city)}
        />
        <div
          onClick={() => setDefaultCityToUserChoice(props.city)}
          className={styles.favoriteCityDetailsContainer}
        >
          <span>{props.city.city}</span>
          <Degrees
            temperature={props.city.temperature.value}
            unit={props.city.temperature.unit}
          />
          <img
            src={require(`.././../../public/icons/${props.city.weatherIcon}.png`)}
            alt="weather icon"
            height={30}
            width={50}
          />
          <span>{props.city.weatherCondition}</span>
        </div>
      </div>
    </>
  );
};
export default FavoriteItem;
