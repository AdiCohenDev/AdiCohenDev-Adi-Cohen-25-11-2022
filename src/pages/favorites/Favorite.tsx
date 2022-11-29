import styles from "./Favorite.module.css";
import { useAppSelector } from "../../store/Hooks";
import { selectFavorites } from "../../store/favorites/FavoritesSlice";
import { useNavigate } from "react-router-dom";
import { IFavoriteListItem } from "../../store/favorites/FavoritesTypes";
import FavoriteItem from "./FavoriteItem";

const Favorites = () => {
  const favoritesList = useAppSelector(selectFavorites);
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.FavoriteWeatherContainer}>
        {favoritesList.length ? (
          favoritesList.map((city: IFavoriteListItem, index: number) => {
            return (
              <div key={index}>
                <FavoriteItem city={city} />
              </div>
            );
          })
        ) : (
          <div className={styles.emptyFavoritesListContainer}>
            <span className={styles.emptyFavoritesList}>
              Nothing here yet..
            </span>
            <span onClick={() => navigate("/")} className={styles.homePageLink}>
              Go to home page to set your favorites cities!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
