interface Weather {
  current_weather: { temperature: number; windspeed: number };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
  };
}
