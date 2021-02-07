import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastrComponent } from './toastr.component';

describe('ToastrComponent', () => {
  let component: ToastrComponent;
  let fixture: ComponentFixture<ToastrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test component instance and it\'s property', () => {
    expect(component).toBeTruthy();
    expect(component.closeToast).toBeDefined();
  });

  it(`should test close method.`, () => {
    expect(component.close).toBeDefined();
    spyOn(component, 'close').and.callThrough();
    component.close();
    expect(component.close).toHaveBeenCalled();
  });
});
