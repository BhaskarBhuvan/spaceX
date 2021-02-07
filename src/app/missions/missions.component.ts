import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { mission } from '../model/mission.model';
import { MissionService } from '../service/api/mission.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent implements OnInit, OnDestroy {
  /** flag to get track the state of api call. true -> before response appears */
  isLoading = false;
  /** flag to check persistance of api error */
  isError = false;
  /** property which holds mission api response */
  missions: mission[];
  /** used to unsubscribe the subscriptions */
  private readonly unsubscribe$ = new Subject();

  /**
   * constructor of MissionsComponent
   * @param _route ActivatedRoute instance. Used to get query params with value.
   * @param _mission Mission service. It is used to get api response.
   */
  constructor(
    private _route: ActivatedRoute,
    private _mission: MissionService
  ) { }

  /**
   * Init lifecycle of angular.
   * It is used to call the api based on query params update.
   */
  ngOnInit(): void {
    this._route.queryParams
      .pipe(
        switchMap((queryObj) => {
          this.isLoading = true;
          return this._mission.getMissions(queryObj);
        }),
        takeUntil(this.unsubscribe$),
      ).subscribe(
        (missions) => {
          this.missions = missions ? missions : [];
          this.isLoading = false;
        },
        (err) => {
          this.isError = true;
          this.isLoading = false;
          this.missions = [];
        }
      );
  }

  /**
   * it is used to close the toastr.
   */
  onToastClose() {
    this.isError = false;
  }

  /**
   * Destroy lifecycle of angular. 
   * It is used to clear the subscription.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
