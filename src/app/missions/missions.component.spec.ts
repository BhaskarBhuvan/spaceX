import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MissionComponent } from '../core/mission/mission.component';
import { MissionService } from '../service/api/mission.service';
import { SpinnerComponent } from '../ui/spinner/spinner.component';
import { ToastrComponent } from '../ui/toastr/toastr.component';

import { MissionsComponent } from './missions.component';

describe('MissionsComponent', () => {
  let component: MissionsComponent;
  let fixture: ComponentFixture<MissionsComponent>;
  const missions = [{
    missionId: ['spaceX123'],
    missionImg: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png',
    missionName: 'FalconSat',
    flightNumber: 2,
    launchYear: '2006',
    launchSuccess: true,
    landSuccess: false
  }];

  const queryObj = {
    'launch_year': '2006'
  };

  const source = {
    lift: (arg1) => {
      arg1.project(queryObj);
    }
  };

  const subscription = {
    subscribe: (fn1, fn2) =>{
      fn1(missions);
    }
  };

  const _route = {
    queryParams: {
      pipe: (operator) => {
        operator(source);
        return subscription;
      }
    }
  };

  let _mission = {
    getMissions: () => {
      return missions;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionsComponent, MissionComponent, SpinnerComponent, ToastrComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: _route},
        {provide: MissionService, useValue: _mission},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsComponent);
    component = fixture.componentInstance;
  });

  it('should test component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should test missions details.', () => {
    subscription.subscribe = (res, err) => {
      res(missions);
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.missions).toEqual(missions);
  });

  it('should test missions details, incase of error', () => {
    subscription.subscribe = (res, err) => {
      err();
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.missions).toEqual([]);
    expect(component.isError).toEqual(true);
  });

  it('should test missions details, incase of empty mission', () => {
    subscription.subscribe = (res, err) => {
      res();
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.missions).toEqual([]);
  });
  
  it(`should test onToastClose method.`, () => {
      component.isError = true;
      fixture.detectChanges();
      expect(component.onToastClose).toBeDefined();
      spyOn(component, 'onToastClose').and.callThrough();
      component.onToastClose();
      expect(component.onToastClose).toHaveBeenCalled();
      expect(component.isError).toEqual(false);
    });

});
