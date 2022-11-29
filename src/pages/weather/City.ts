import {
  IApiCity,
  ICity,
  ICurrentWeather,
  ICurrentWeatherApi,
} from "./CityTypes";
import { format } from "date-fns";
import {
  IUpcoming5DaysWeather,
  IUpcoming5DaysWeatherApi,
} from "../../store/weather/WeatherTypes";

export function makeCity(apiCity: IApiCity): ICity {
  return {
    city: apiCity.LocalizedName,
    country: apiCity.Country.LocalizedName,
    keyArea: apiCity.Key,
  };
}

export function currentCityWeather(
  currentWeather: ICurrentWeatherApi[]
): ICurrentWeather {
  const currentWeatherDate = new Date(
    currentWeather[0].LocalObservationDateTime
  );
  const monthAndDateCombination = format(currentWeatherDate, "PPpp");
  const monthAndDate = convertDateIntoMonthAndDateValue(
    monthAndDateCombination
  );
  const dayFromDate = format(currentWeatherDate, "iiii");

  return {
    temperature: {
      imperial: {
        value: currentWeather[0].Temperature.Imperial.Value,
        unit: currentWeather[0].Temperature.Imperial.Unit,
      },
      metric: {
        value: currentWeather[0].Temperature.Metric.Value,
        unit: currentWeather[0].Temperature.Metric.Unit,
      },
    },
    weatherText: currentWeather[0].WeatherText,
    weatherIcon: currentWeather[0].WeatherIcon,
    day: dayFromDate,
    monthAndDate: monthAndDate,
  };
}

const convertDateIntoMonthAndDateValue = (date: string) => {
  return date.replaceAll(",", "").split(" ").slice(0, 2).join(" ");
};

export function _5DaysWeather(
  weatherDataArr: IUpcoming5DaysWeatherApi[]
): IUpcoming5DaysWeather[] {
  return weatherDataArr.map((weatherData) => {
    return {
      date: weatherData.Date,
      day: {
        icon: weatherData.Day.Icon,
        weatherDescription: weatherData.Day.IconPhrase,
      },
      temperature: {
        minimum: {
          value: weatherData.Temperature.Minimum.Value,
          unit: weatherData.Temperature.Minimum.Unit,
        },
        maximum: {
          value: weatherData.Temperature.Maximum.Value,
          unit: weatherData.Temperature.Maximum.Unit,
        },
      },
    };
  });
}
