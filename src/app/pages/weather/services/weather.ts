import { httpResource } from '@angular/common/http';
import { computed, Service, signal } from '@angular/core';

const CITIES = [
  { name: 'თბილისი', lat: 41.72, lon: 44.79 },
  { name: 'ბათუმი', lat: 41.62, lon: 41.64 },
  { name: 'ქუთაისი', lat: 42.27, lon: 42.69 },
  { name: 'რუსთავი', lat: 41.55, lon: 45.01 },
  { name: 'გორი', lat: 41.98, lon: 44.11 },
  { name: 'ზუგდიდი', lat: 42.51, lon: 41.87 },
  { name: 'ფოთი', lat: 42.15, lon: 41.67 },
  { name: 'თელავი', lat: 41.92, lon: 45.47 },
  { name: 'ახალციხე', lat: 41.64, lon: 42.98 },
  { name: 'მესტია', lat: 43.05, lon: 42.73 },
  { name: 'ნიუ-იორკი 🇺🇸', lat: 40.71, lon: -74.01 },
  { name: 'ლონდონი 🇬🇧', lat: 51.51, lon: -0.13 },
  { name: 'პარიზი 🇫🇷', lat: 48.86, lon: 2.35 },
  { name: 'ბერლინი 🇩🇪', lat: 52.52, lon: 13.41 },
  { name: 'რომი 🇮🇹', lat: 41.9, lon: 12.5 },
  { name: 'სტამბოლი 🇹🇷', lat: 41.01, lon: 28.98 },
  { name: 'დუბაი 🇦🇪', lat: 25.2, lon: 55.27 },
  { name: 'მოსკოვი 🇷🇺', lat: 55.76, lon: 37.62 },
  { name: 'ტოკიო 🇯🇵', lat: 35.68, lon: 139.69 },
  { name: 'სიდნეი 🇦🇺', lat: -33.87, lon: 151.21 },
];

@Service({ autoProvided: false })
export class WeatherService {
  readonly cities = CITIES;
  readonly cityName = signal('თბილისი');

  private readonly city = computed(
    () => this.cities.find((c) => c.name === this.cityName()) ?? this.cities[0],
  );

  private readonly weatherResource = httpResource<Weather>(
    () =>
      `https://api.open-meteo.com/v1/forecast?latitude=${this.city().lat}&longitude=${this.city().lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`,
  );

  readonly isLoading = this.weatherResource.isLoading;
  readonly weather = computed(() => this.weatherResource.value());
  readonly current = computed(() => this.weather()?.current_weather);

  readonly rows = computed(() => {
    const d = this.weather()?.daily;
    if (!d) return [];
    return d.time.map((date, i) => ({
      date,
      max: d.temperature_2m_max[i],
      min: d.temperature_2m_min[i],
      rain: d.precipitation_sum[i],
    }));
  });

  reload() {
    this.weatherResource.reload();
  }

  log() {
    console.log(this.weather());
  }
}
