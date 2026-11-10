import { httpResource } from "@angular/common/http";
import { computed, Service } from "@angular/core";

@Service({ autoProvided: false })
export class WeatherService {

  private readonly weatherResource = httpResource<Weather>(
    () =>
      'https://api.open-meteo.com/v1/forecast?latitude=41.72&longitude=44.79&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto',
  );

  readonly isLoading = this.weatherResource.isLoading;
  readonly weather = computed(() => this.weatherResource.value());


  reload() {
    this.weatherResource.reload();
  }

  log() {
    console.log(this.weather);
  }

}
