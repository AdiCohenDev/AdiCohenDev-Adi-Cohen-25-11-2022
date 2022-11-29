import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";
import { DegreeUnit, Theme } from "./UserPreferencesTypes";

interface IUserPreferencesState {
  theme: Theme;
  degreeUnit: DegreeUnit;
  location: string;
}

const isBrowserDefaultDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const initialState: IUserPreferencesState = {
  theme: isBrowserDefaultDark() ? "dark" : "light",
  degreeUnit: "C",
  location: "Israel",
};

export const userPreferencesSlice = createSlice({
  name: "UserPreferences",
  initialState,
  reducers: {
    setTheme: (state, { payload }: PayloadAction<Theme>) => {
      state.theme = payload;
      localStorage.setItem("theme", JSON.stringify(state.theme));
    },
    setDegreeUnit: (state, { payload }: PayloadAction<DegreeUnit>) => {
      state.degreeUnit = payload;
    },
    setLocation: (state, { payload }) => {
      state.location = payload;
    },
  },
});

export const { setDegreeUnit, setLocation, setTheme } =
  userPreferencesSlice.actions;

export const selectAppTheme = (state: RootState) => state.userPreferences.theme;
export const selectAppDegreeUnit = (state: RootState) =>
  state.userPreferences.degreeUnit;

export default userPreferencesSlice.reducer;
