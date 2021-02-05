import { Component, OnInit } from '@angular/core';
import { EVEN_YEARS, ODD_YEARS } from './filters.component.const';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  evenYears = EVEN_YEARS;
  oddYears = ODD_YEARS;
  constructor() { }

  ngOnInit(): void {
  }

}
