import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from '../core/filter/filter.component';

import { FiltersComponent } from './filters.component';
import { EVEN_YEARS, ODD_YEARS } from './filters.component.const';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test component instance and it\'s property', () => {
    expect(component).toBeTruthy();
    expect(component.oddYears).toEqual(ODD_YEARS);
    expect(component.evenYears).toEqual(EVEN_YEARS);
  });

  it('should test filter title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.filters .filters__header').textContent).toContain('Filters');
  });

});
