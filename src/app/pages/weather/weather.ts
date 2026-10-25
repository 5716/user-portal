import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TempColorPipe } from '../../shared/pipes/pipes';

@Component({
  selector: 'app-weather',
  imports: [NzTableModule, DatePipe, NzButtonModule, NzIconModule, TempColorPipe],
  templateUrl: './weather.html',
})
export class WeatherPage {
  weather = httpResource<Weather>(
    () =>
      'https://api.open-meteo.com/v1/forecast?latitude=41.72&longitude=44.79&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto',
  );

  current = computed(() => this.weather.value()?.current_weather);

  rows = computed(() => {
    const d = this.weather.value()?.daily;
    if (!d) return [];
    return d.time.map((date, i) => ({
      date,
      max: d.temperature_2m_max[i],
      min: d.temperature_2m_min[i],
      rain: d.precipitation_sum[i],
    }));
  });

  reload() {
    this.weather.reload();
  }
}
