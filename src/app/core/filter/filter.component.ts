import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
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
  /** it will subscription reference */
  private subscription: Subscription;

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
    this.subscription = this.route.queryParams.subscribe((query: Params) => {
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

  /**
   * destroy lifecycle of angular component.
   * It is used to unsubscribe the subscriptions
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
