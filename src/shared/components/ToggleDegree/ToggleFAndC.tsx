import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import {
  selectAppDegreeUnit,
  setDegreeUnit,
} from "../../../store/user-preferences/UserPreferencesSlice";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import styles from "./ToggleFAndC.module.css";
import { DegreeUnit } from "../../../store/user-preferences/UserPreferencesTypes";

const ToggleFAndC = () => {
  const appDegreeUnit = useAppSelector(selectAppDegreeUnit);
  const dispatch = useAppDispatch();

  const handleDegreeUnit = (
    event: React.MouseEvent<HTMLElement>,
    newDegreeUnit: DegreeUnit
  ) => {
    if (!newDegreeUnit) return;
    setDegreeUnit(newDegreeUnit);
    dispatch(setDegreeUnit(newDegreeUnit));
  };

  return (
    <div className={styles.toggleButtonContainer}>
      <ToggleButtonGroup
        size={"small"}
        value={appDegreeUnit}
        exclusive
        onChange={handleDegreeUnit}
        aria-label="degree unit toggle"
      >
        <ToggleButton value="C">
          <DeviceThermostatIcon />C
        </ToggleButton>
        <ToggleButton value="F">
          <DeviceThermostatIcon />F
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ToggleFAndC;
