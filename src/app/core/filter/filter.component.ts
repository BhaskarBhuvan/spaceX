import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  /** query param name for url. e.g- launch_year */
  @Input() queryKey: string;
  /** header of filter */
  @Input() header: string;
  /** Filter array for first column */
  @Input() firstColumn: string[] | boolean[];
  /** filter array for second column */
  @Input() secondColumn: string[] | boolean[];
  /** property which holds the queryParams value */
  queryObj: Params;
  /**
   * constructor of FilterComponent
   * @param router router instance of angular router. Used for updating the query params.
   * @param route ActivatedRoute instance. Used to get query params with value.
   */
  constructor(private router: Router, private route: ActivatedRoute) {}

  /**
   * Init lifecycle of angular
   * It is used for queryParams subscription.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe((query: Params) => {
      this.queryObj = query;
    });
  }

  /**
   * This method update the url on filter select
   * @param paramValue - selected button value
   */
  onFilterSelect(paramValue: string | boolean) {
    const queryParams =
      this.queryObj[this.queryKey] === paramValue.toString()
        ? { [this.queryKey]: null }
        : { [this.queryKey]: paramValue };

    this.router.navigate(['/'], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
