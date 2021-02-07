import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { mission } from '../model/mission.model';
import { MissionService } from '../service/api/mission.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent implements OnInit {
  /** flag to get track the state of api call. true -> before response appears */
  isLoading = false;
  isError = false;
  missions: mission[];
  constructor(
    private _route: ActivatedRoute,
    private _mission: MissionService
  ) { }

  ngOnInit(): void {
    this._route.queryParams
      .pipe(switchMap((queryObj) => {
        this.isLoading = true;
        return this._mission.getMissions(queryObj);
      })
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

  onToastClose() {
    this.isError = false;
  }
}
