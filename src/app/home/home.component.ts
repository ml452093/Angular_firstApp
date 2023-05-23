import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housinglocation.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location *ngFor="let housingLocation of filteredHousingLocationList" [housingLocation]="housingLocation"></app-housing-location>
  </section>
`,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredHousingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredHousingLocationList = this.housingLocationList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredHousingLocationList = this.housingLocationList;
    }

    this.filteredHousingLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
