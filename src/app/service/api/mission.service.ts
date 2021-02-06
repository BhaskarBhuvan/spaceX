import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mission } from 'src/app/model/mission.model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http: HttpClient) { }

  getMissions(queryObj:{[key:string]: string}):Observable<mission[]> {
    const params = new HttpParams({
      fromObject: {
        ...queryObj,
        limit: '100'
      }
    });

    return this.http.get<{[key:string]: any}[]>('https://api.spacexdata.com/v3/launches', {
      params,
      observe: 'body'
    }).pipe(map(res => {
      const missions = (res || []).map((mission) => {
        return {
          missionId: mission?.mission_id,
          missionImg: mission?.links?.mission_patch_small,
          missionName: mission?.mission_name,
          flightNumber: mission?.flight_number,
          launchYear: mission?.launch_year,
          launchSuccess: mission?.launch_success,
          landSuccess: mission?.rocket?.first_stage?.cores[0]?.land_success
        }
      });
      return missions;
    }));
  }
}
