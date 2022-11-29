export interface IApiCity {
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
  Key: string;
}

export interface ICity {
  country: string;
  city: string;
  keyArea: string;
}

export interface ICurrentWeatherApi {
  Temperature: ICurrentWeatherTemperatureApi;
  WeatherText: string;
  WeatherIcon: number;
  LocalObservationDateTime: string;
}

export interface ICurrentWeather {
  temperature: ICurrentWeatherTemperature;
  weatherText: string;
  weatherIcon: number;
  day: string;
  monthAndDate: string;
}

export interface ICurrentWeatherTemperatureApi {
  Imperial: ITemperatureApi;
  Metric: ITemperatureApi;
}

export interface ICurrentWeatherTemperature {
  imperial: ITemperature;
  metric: ITemperature;
}

export interface ITemperatureApi {
  Value: number;
  Unit: string;
}

export interface ITemperature {
  value: number;
  unit: string;
}
