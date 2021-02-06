import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, switchMap } from 'rxjs/operators';
import { mission } from '../model/mission.model';
import { MissionService } from '../service/api/mission.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent implements OnInit {
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
        return this._mission.getMissions(queryObj)
      })
      ).subscribe(
        (missions) => {
          this.missions = missions ? missions : [];
          this.isLoading = false;
        },
        (err) => {
          this.isError = true;
          this.isLoading = false
        }
      );
  }

  onToastClose() {
    this.isError = false;
  }
}
