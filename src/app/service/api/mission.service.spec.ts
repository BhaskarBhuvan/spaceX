import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MissionService } from './mission.service';

describe('MissionService', () => {
    let service: MissionService;

    const missions = [{
        missionId: ['spaceX123'],
        missionImg: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png',
        missionName: 'FalconSat',
        flightNumber: 2,
        launchYear: '2006',
        launchSuccess: true,
        landSuccess: false
      }];

      let response : {[key:string]: any}[] = [{}];

      let res : {[key:string]: any}[] = [{
        mission_id: ['spaceX123'],
        links:{
            mission_patch_small: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png'
        },
        mission_name: 'FalconSat',
        flight_number: 2,
        launch_year: '2006',
        launch_success: true,
        rocket: {
            first_stage: {
                cores: [
                    {
                        land_success: false
                    }
                ]
            }
        }
      }];

    const source = {
        lift: (arg1) => {
            arg1.project(response);
        }
    };


    const http = {
        get: () => {
            return {
                pipe: (operator) => {
                    operator(source);
                  }
            }
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useValue: http }
            ]
        });
        service = TestBed.inject(MissionService);
    });

    it('should test service', () => {
        expect(service).toBeTruthy();
    });

    it(`should test getMissions method.`, () => {
        const queryObj = {
            'launch_year': '2006'
        }
        expect(service.getMissions).toBeDefined();
        spyOn(service, 'getMissions').and.callThrough();
        expect(http.get).toBeDefined();
        spyOn(http, 'get').and.callThrough();
        service.getMissions(queryObj);
        expect(service.getMissions).toHaveBeenCalled();
        expect(http.get).toHaveBeenCalled();
    });

    it(`should test getMissions method. if response not available`, () => {
        const queryObj = {
            'launch_year': '2006'
        }
        response = null;
        expect(service.getMissions).toBeDefined();
        spyOn(service, 'getMissions').and.callThrough();
        expect(http.get).toBeDefined();
        spyOn(http, 'get').and.callThrough();
        service.getMissions(queryObj);
        expect(service.getMissions).toHaveBeenCalled();
        expect(http.get).toHaveBeenCalled();
    });

    it(`should test getMissions method. if response is different`, () => {
        const queryObj = {
            'launch_year': '2006'
        }
        response = [missions];
        expect(service.getMissions).toBeDefined();
        spyOn(service, 'getMissions').and.callThrough();
        expect(http.get).toBeDefined();
        spyOn(http, 'get').and.callThrough();
        service.getMissions(queryObj);
        expect(service.getMissions).toHaveBeenCalled();
        expect(http.get).toHaveBeenCalled();
    });

    it(`should test getMissions method. if mission detail is available`, () => {
        const queryObj = {
            'launch_year': '2006'
        }
        response = res;
        expect(service.getMissions).toBeDefined();
        spyOn(service, 'getMissions').and.callThrough();
        expect(http.get).toBeDefined();
        spyOn(http, 'get').and.callThrough();
        service.getMissions(queryObj);
        expect(service.getMissions).toHaveBeenCalled();
        expect(http.get).toHaveBeenCalled();
    });

});
