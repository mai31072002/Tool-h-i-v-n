import { TemperatureUnits } from "app/values/weather";
import moment from "moment";
import { getSunrise, getSunset } from "sunrise-sunset-js";

import day1 from "../../assets/img/weather/day/2.svg";
import day2 from "../../assets/img/weather/day/3.svg";
import day3 from "../../assets/img/weather/day/3.svg";
import day4 from "../../assets/img/weather/day/3.svg";
import day5 from "../../assets/img/weather/day/4.svg";
import day6 from "../../assets/img/weather/day/4.svg";
import day7 from "../../assets/img/weather/day/6.svg";
import day8 from "../../assets/img/weather/day/7.svg";
import day9 from "../../assets/img/weather/day/7.svg";
import day10 from "../../assets/img/weather/day/7.svg";
import day11 from "../../assets/img/weather/day/7.svg";
import day12 from "../../assets/img/weather/day/8.svg";
import day13 from "../../assets/img/weather/day/15.svg";
import day14 from "../../assets/img/weather/day/10_11_12.svg";
import day15 from "../../assets/img/weather/day/13_14_17.svg";
import day16 from "../../assets/img/weather/day/13_14_17.svg";
import day17 from "../../assets/img/weather/day/10_11_12.svg";
import day18 from "../../assets/img/weather/day/10_11_12.svg";
import day19 from "../../assets/img/weather/day/10_11_12.svg";
import day20 from "../../assets/img/weather/day/10_11_12.svg";
import day21 from "../../assets/img/weather/day/13_14_17.svg";
import day22 from "../../assets/img/weather/day/13_14_17.svg";
import day23 from "../../assets/img/weather/day/13_14_17.svg";
import day24 from "../../assets/img/weather/day/13_14_17.svg";
import day25 from "../../assets/img/weather/day/13_14_17.svg";
import day26 from "../../assets/img/weather/day/13_14_17.svg";
import day27 from "../../assets/img/weather/day/13_14_17.svg";
import day28 from "../../assets/img/weather/day/13_14_17.svg";

import night1 from "../../assets/img/weather/night/3_4.svg";
import night2 from "../../assets/img/weather/night/3_4.svg";
import night3 from "../../assets/img/weather/night/3_4.svg";
import night4 from "../../assets/img/weather/night/3_4.svg";
import night5 from "../../assets/img/weather/night/3_4.svg";
import night6 from "../../assets/img/weather/night/3_4.svg";
import night7 from "../../assets/img/weather/night/6.svg";
import night8 from "../../assets/img/weather/night/7.svg";
import night9 from "../../assets/img/weather/night/7.svg";
import night10 from "../../assets/img/weather/night/7.svg";
import night11 from "../../assets/img/weather/night/7.svg";
import night12 from "../../assets/img/weather/night/8.svg";
import night13 from "../../assets/img/weather/night/15.svg";
import night14 from "../../assets/img/weather/night/10_11_12.svg";
import night15 from "../../assets/img/weather/night/13_14_17.svg";
import night16 from "../../assets/img/weather/night/13_14_17.svg";
import night17 from "../../assets/img/weather/night/10_11_12.svg";
import night18 from "../../assets/img/weather/night/10_11_12.svg";
import night19 from "../../assets/img/weather/night/10_11_12.svg";
import night20 from "../../assets/img/weather/night/10_11_12.svg";
import night21 from "../../assets/img/weather/night/13_14_17.svg";
import night22 from "../../assets/img/weather/night/13_14_17.svg";
import night23 from "../../assets/img/weather/night/13_14_17.svg";
import night24 from "../../assets/img/weather/night/13_14_17.svg";
import night25 from "../../assets/img/weather/night/13_14_17.svg";
import night26 from "../../assets/img/weather/night/13_14_17.svg";
import night27 from "../../assets/img/weather/night/13_14_17.svg";
import night28 from "../../assets/img/weather/night/13_14_17.svg";

import wind0 from "../../assets/img/weather/wind/0.svg";
import wind1 from "../../assets/img/weather/wind/1.svg";
import wind2 from "../../assets/img/weather/wind/2.svg";
import wind3 from "../../assets/img/weather/wind/3.svg";
import wind4 from "../../assets/img/weather/wind/4.svg";
import wind5 from "../../assets/img/weather/wind/5.svg";
import wind6 from "../../assets/img/weather/wind/6.svg";
import wind7 from "../../assets/img/weather/wind/7.svg";
import wind8 from "../../assets/img/weather/wind/8.svg";
import wind9 from "../../assets/img/weather/wind/9.svg";
import wind10 from "../../assets/img/weather/wind/10.svg";
import wind11 from "../../assets/img/weather/wind/11.svg";
import wind12 from "../../assets/img/weather/wind/12.svg";
import wind13 from "../../assets/img/weather/wind/13.svg";
import wind14 from "../../assets/img/weather/wind/14.svg";
import wind15 from "../../assets/img/weather/wind/15.svg";

import windLight0 from "../../assets/img/weather/wind_lightmode/0.svg";
import windLight1 from "../../assets/img/weather/wind_lightmode/1.svg";
import windLight2 from "../../assets/img/weather/wind_lightmode/2.svg";
import windLight3 from "../../assets/img/weather/wind_lightmode/3.svg";
import windLight4 from "../../assets/img/weather/wind_lightmode/4.svg";
import windLight5 from "../../assets/img/weather/wind_lightmode/5.svg";
import windLight6 from "../../assets/img/weather/wind_lightmode/6.svg";
import windLight7 from "../../assets/img/weather/wind_lightmode/7.svg";
import windLight8 from "../../assets/img/weather/wind_lightmode/8.svg";
import windLight9 from "../../assets/img/weather/wind_lightmode/9.svg";
import windLight10 from "../../assets/img/weather/wind_lightmode/10.svg";
import windLight11 from "../../assets/img/weather/wind_lightmode/11.svg";
import windLight12 from "../../assets/img/weather/wind_lightmode/12.svg";
import windLight13 from "../../assets/img/weather/wind_lightmode/13.svg";
import windLight14 from "../../assets/img/weather/wind_lightmode/14.svg";
import windLight15 from "../../assets/img/weather/wind_lightmode/15.svg";

const dayIcons = {
  1: day1,
  2: day2,
  3: day3,
  4: day4,
  5: day5,
  6: day6,
  7: day7,
  8: day8,
  9: day9,
  10: day10,
  11: day11,
  12: day12,
  13: day13,
  14: day14,
  15: day15,
  16: day16,
  17: day17,
  18: day18,
  19: day19,
  20: day20,
  21: day21,
  22: day22,
  23: day23,
  24: day24,
  25: day25,
  26: day26,
  27: day27,
  28: day28,
};

const nightIcons = {
  1: night1,
  2: night2,
  3: night3,
  4: night4,
  5: night5,
  6: night6,
  7: night7,
  8: night8,
  9: night9,
  10: night10,
  11: night11,
  12: night12,
  13: night13,
  14: night14,
  15: night15,
  16: night16,
  17: night17,
  18: night18,
  19: night19,
  20: night20,
  21: night21,
  22: night22,
  23: night23,
  24: night24,
  25: night25,
  26: night26,
  27: night27,
  28: night28,
};

const dayStates = {
  1: "Day state 1",
  2: "Day state 2",
  3: "Day state 3",
  4: "Day state 4",
  5: "Day state 5",
  6: "Day state 6",
  7: "Day state 7",
  8: "Day state 8",
  9: "Day state 9",
  10: "Day state 10",
  11: "Day state 11",
  12: "Day state 12",
  13: "Day state 13",
  14: "Day state 14",
  15: "Day state 15",
  16: "Day state 16",
  17: "Day state 17",
  18: "Day state 18",
  19: "Day state 19",
  20: "Day state 20",
  21: "Day state 21",
  22: "Day state 22",
  23: "Day state 23",
  24: "Day state 24",
  25: "Day state 25",
  26: "Day state 26",
  27: "Day state 27",
  28: "Day state 28",
};

const nightStates = {
  1: "Night state 1",
  2: "Night state 2",
  3: "Night state 3",
  4: "Night state 4",
  5: "Night state 5",
  6: "Night state 6",
  7: "Night state 7",
  8: "Night state 8",
  9: "Night state 9",
  10: "Night state 10",
  11: "Night state 11",
  12: "Night state 12",
  13: "Night state 13",
  14: "Night state 14",
  15: "Night state 15",
  16: "Night state 16",
  17: "Night state 17",
  18: "Night state 18",
  19: "Night state 19",
  20: "Night state 20",
  21: "Night state 21",
  22: "Night state 22",
  23: "Night state 23",
  24: "Night state 24",
  25: "Night state 25",
  26: "Night state 26",
  27: "Night state 27",
  28: "Night state 28",
};

const windIcons = {
  0: wind0,
  1: wind1,
  2: wind2,
  3: wind3,
  4: wind4,
  5: wind5,
  6: wind6,
  7: wind7,
  8: wind8,
  9: wind9,
  10: wind10,
  11: wind11,
  12: wind12,
  13: wind13,
  14: wind14,
  15: wind15,
};
const windIconLight = {
  0: windLight0,
  1: windLight1,
  2: windLight2,
  3: windLight3,
  4: windLight4,
  5: windLight5,
  6: windLight6,
  7: windLight7,
  8: windLight8,
  9: windLight9,
  10: windLight10,
  11: windLight11,
  12: windLight12,
  13: windLight13,
  14: windLight14,
  15: windLight15,
};
const defaultDayBreak = 19;
const defaultNightBreak = 6;
const formatDate = "YYYY-MM-DD";
const formatDateTime = "HH:mm DD/MM/YYYY";

const isNull = (value) => value === null || value === undefined;

export const getWeatherIcon = (time, weatherStatus, lat, lng) => {
  const sunrise = getSunrise(
    lat,
    lng,
    new Date(moment(time, formatDateTime).format(formatDate))
  );
  const sunset = getSunset(
    lat,
    lng,
    new Date(moment(time, formatDateTime).format(formatDate))
  );

  const sunRiseHour = moment(sunrise).hour() + 1;
  const sunSetHour = moment(sunset).hour();

  let iconSet;
  if (!time) iconSet = dayIcons;
  else {
    const hour = moment(time, formatDateTime).hour();
    iconSet = hour > sunRiseHour && hour <= sunSetHour ? dayIcons : nightIcons;
  }

  return iconSet[weatherStatus];
};

export const getWeatherState = (
  state,
  weather,
  time,
  defaultValue,
  dayBreak = defaultDayBreak,
  nightBreak = defaultNightBreak
) => {
  if (state) return state;

  let stateSet;
  if (!time) stateSet = dayStates;
  else {
    const hour = moment(time).hour();
    stateSet = hour > nightBreak && hour <= dayBreak ? dayStates : nightStates;
  }

  return stateSet[weather] ? stateSet[weather] : defaultValue;
};

export const getTemperature = (temperature, unit, defaultValue = "--") => {
  if (isNull(temperature)) return defaultValue;

  if (unit === TemperatureUnits.f) {
    return `${Math.round(temperature * 1.8 + 32)}°F`;
  }

  return `${Math.round(temperature)}°C`;
};

export const getTemperatureValue = (temperature, unit) => {
  if (unit === TemperatureUnits.f) {
    return Math.round(temperature * 1.8 + 32);
  }

  return Math.round(temperature);
};

export const getWindSpeed = (speed) => {
  if (isNull(speed)) return "--";

  // return `${Math.round((speed * 3.6 + Number.EPSILON) * 10) / 10} km/h`;
  return `${speed} m/s`;
};

export const getWindIcon = (direction) => {
  if (isNull(direction)) return null;

  return localStorage.getItem("primaryThemes") !== "1"
    ? windIconLight[direction]
    : windIcons[direction];
};

export const getAirQuality = (aqi, t) => {
  if (isNull(aqi)) return "--";

  if (aqi > 300) return `${t("Hazardous")} - ${aqi}`;
  if (aqi > 200) return `${t("Very unhealthy")} - ${aqi}`;
  if (aqi > 150) return `${t("Unhealthy")} - ${aqi}`;
  if (aqi > 100) return `${t("Poor")} - ${aqi}`;
  if (aqi > 50) return `${t("Moderate")} - ${aqi}`;

  return `${t("Good")} - ${aqi}`;
};

export const getUV = (uvIndex, t) => {
  if (isNull(uvIndex)) return "--";

  if (uvIndex > 8) return `${t("Extreme")} - ${uvIndex}`;
  if (uvIndex > 6) return `${t("Very high")} - ${uvIndex}`;
  if (uvIndex > 4) return `${t("High")} - ${uvIndex}`;
  if (uvIndex > 2) return `${t("Moderate")} - ${uvIndex}`;

  return `${t("Low")} - ${uvIndex}`;
};

export const getHumidity = (humidity) => {
  if (isNull(humidity)) return "--";

  return `${humidity}%`;
};

export const getRainProbability = (rainProbability) => {
  if (isNull(rainProbability)) return "--";

  return `${rainProbability}%`;
};

export const getVisibility = (visibility) => {
  if (isNull(visibility)) return "--";

  return `${Math.round(visibility)}km`;
};

export const getCloudCover = (cloudCover) => {
  if (isNull(cloudCover)) return "--";

  return `${cloudCover}%`;
};
