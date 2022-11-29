import styles from "./Weather.module.css";
import Degrees from "../../shared/components/Degrees";
import { IUpcoming5DaysWeather } from "../../store/weather/WeatherTypes";

interface IProps {
  city: IUpcoming5DaysWeather;
  day: string;
}

const WeatherDay = (props: IProps) => {
  return (
    <>
      <div className={styles.upcomingDay}>
        <span className={styles.day}>{props.day}</span>

        <img
          src={require(`.././../../public/icons/${props.city.day.icon}.png`)}
          alt="weather icon"
          height={50}
          width={"auto"}
        />
        <div className={styles.minMaxDegrees}>
          <Degrees
            temperature={props.city.temperature.minimum.value}
            unit={props.city.temperature.minimum.unit}
          />
          <span> / </span>
          <Degrees
            temperature={props.city.temperature.maximum.value}
            unit={props.city.temperature.maximum.unit}
          />
        </div>

        <div className={styles.setInCenter}>
          {props.city.day.weatherDescription}
        </div>
      </div>
    </>
  );
};

export default WeatherDay;
