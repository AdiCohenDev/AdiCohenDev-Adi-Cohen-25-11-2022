import { selectAppDegreeUnit } from "../../store/user-preferences/UserPreferencesSlice";
import { useAppSelector } from "../../store/Hooks";
import { useEffect, useState } from "react";

interface IProps {
  temperature: number;
  unit: string;
}

const Degrees = (props: IProps) => {
  const [degreeText, setDegreeText] = useState<string>("");
  const degreeUnit = useAppSelector(selectAppDegreeUnit);

  const cToF = (celsius: number): number => {
    const cTemp = celsius;
    const cToFahr = Math.floor((cTemp * 9) / 5 + 32);
    return cToFahr;
  };
  const fToC = (fahrenheit: number): number => {
    const fTemp = fahrenheit;
    const fToCel = Math.floor(((fTemp - 32) * 5) / 9);
    return fToCel;
  };

  useEffect(() => {
    const degreeSymbol = "\xB0";

    if (
      (degreeUnit === "F" && props.unit === "F") ||
      (degreeUnit === "C" && props.unit === "C")
    ) {
      setDegreeText(props.temperature + `${degreeSymbol}${degreeUnit}`);
    } else if (degreeUnit === "F" && props.unit === "C") {
      cToF(props.temperature);
      setDegreeText(cToF(props.temperature) + `${degreeSymbol}${degreeUnit}`);
    } else if (degreeUnit === "C" && props.unit === "F") {
      setDegreeText(fToC(props.temperature) + `${degreeSymbol}${degreeUnit}`);
    }
  }, [degreeUnit]);

  return <div>{degreeText}</div>;
};

export default Degrees;
