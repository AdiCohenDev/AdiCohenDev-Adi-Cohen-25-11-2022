import { ITemperature } from "../../pages/weather/CityTypes";

export interface IFavoritesState {
  list: IFavoriteListItem[];
}

export interface IFavoriteListItem {
  city: string;
  degrees: number;
  weatherCondition: string;
  temperature: ITemperature;
  weatherIcon: number;
  keyArea: string;
}
