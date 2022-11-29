import { ITemperature, ITemperatureApi } from "../../pages/weather/CityTypes";

export interface ICurrentCity {
  city: string;
  keyArea: string;
  country: string;
}

export interface IUpcoming5DaysWeatherApi {
  Date: string | Date;
  Day: IDayApi;
  Temperature: I5DaysWeatherTemperatureApi;
}

interface IDayApi {
  Icon: number;
  IconPhrase: string;
}

export interface IUpcoming5DaysWeather {
  date: string | Date;
  day: IDay;
  temperature: I5DaysWeatherTemperature;
}

interface IDay {
  icon: number;
  weatherDescription: string;
}

interface I5DaysWeatherTemperatureApi {
  Minimum: ITemperatureApi;
  Maximum: ITemperatureApi;
}

interface I5DaysWeatherTemperature {
  minimum: ITemperature;
  maximum: ITemperature;
}
