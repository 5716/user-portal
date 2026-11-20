import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TempColorPipe } from '../../shared/pipes/pipes';
import { WeatherService } from './services/weather';

@Component({
  selector: 'app-weather',
  imports: [
    NzTableModule,
    DatePipe,
    NzButtonModule,
    NzIconModule,
    TempColorPipe,
    NzSkeletonModule,
    NzSelectModule,
    FormsModule,
  ],
  templateUrl: './weather.html',
})
export class WeatherPage {
  private weatherService = inject(WeatherService);

  cities = this.weatherService.cities;
  cityName = this.weatherService.cityName;
  isLoading = this.weatherService.isLoading;
  weather = this.weatherService.weather;
  current = this.weatherService.current;
  rows = this.weatherService.rows;

  reload() {
    this.weatherService.reload();
  }
}
