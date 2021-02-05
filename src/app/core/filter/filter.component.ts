import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() queryKey: string;
  @Input() header: string;
  @Input() firstColumn: string[] | boolean[];
  @Input() secondColumn: string[] | boolean[];

  queryObj: Params;

  constructor(private router: Router, private route: ActivatedRoute) {}

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
