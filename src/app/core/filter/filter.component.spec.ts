import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  const queryObj = {
    'launch_year': '2006'
  };
  const _router = {
    navigate: (path, routerObj) => {
      if(path && routerObj){
        return true;
      }
    }
  };

  const _route = {
    queryParams: {
      subscribe: (fn1) =>{
        fn1(queryObj);
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ],
      providers:[
        {provide: Router, useValue: _router},
        {provide: ActivatedRoute, useValue: _route},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('should test onFilterSelect method', () => {
    it(`should test onFilterSelect method.
        if same launch year is in queryObj`, () => {
      const launchYear = '2006';
      component.queryKey = 'launch_year';
      expect(component.onFilterSelect).toBeDefined();
      spyOn(component, 'onFilterSelect').and.callThrough();
      component.onFilterSelect(launchYear);
      expect(component.onFilterSelect).toHaveBeenCalledWith('2006');
    });

    it(`should test onFilterSelect method.
        if different launch year is in queryObj`, () => {
      const launchYear = '2007';
      component.queryKey = 'launch_year';
      expect(component.onFilterSelect).toBeDefined();
      spyOn(component, 'onFilterSelect').and.callThrough();
      component.onFilterSelect(launchYear);
      expect(component.onFilterSelect).toHaveBeenCalledWith('2007');
    });
  });

});
