import { Component } from '@angular/core';
import {
  brands,
  years,
  memory,
  operatingSystem,
  screenSize,
  screenResolution,
  screenTechnology,
  screenFrequency
} from '../../../../core/types/phone';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})
export class FilterComponent {
  public brands: string[] = brands;
  public years: number[] = years;
  public memory: number[] = memory;
  public operatingSystem: string[] = operatingSystem;
  public screenSize: string[] = screenSize;
  public screenResolution: string[] = screenResolution;
  public screenTechnology: string[] = screenTechnology;
  public screenFrequency: number[] = screenFrequency;
}
