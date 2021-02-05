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
  missions: mission[];
  constructor(
    private _route: ActivatedRoute,
    private _mission: MissionService
  ) {}

  ngOnInit(): void {
    this._route.queryParams
      .pipe(switchMap((queryObj) => this._mission.getMissions(queryObj)))
      .subscribe(
        (missions) => {
          this.missions = missions ? missions : [];
        },
        (err) => {
          console.error('err', err);
        }
      );
  }
}
