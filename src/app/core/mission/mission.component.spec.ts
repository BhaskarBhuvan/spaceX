import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionComponent } from './mission.component';

describe('MissionComponent', () => {
  let component: MissionComponent;
  let fixture: ComponentFixture<MissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MissionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionComponent);
    component = fixture.componentInstance;
    component.mission = {
      missionId: ['spaceX123'],
      missionImg: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png',
      missionName: 'FalconSat',
      flightNumber: 2,
      launchYear: '2006',
      launchSuccess: true,
      landSuccess: false
    };
    fixture.detectChanges();
  });

  it('should test component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should test mission title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.mission__content .mission__title').textContent).toContain('FalconSat#2');
  });

  it('should test mission image', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div.mission__image-container>img').src).toContain('https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png');
  });
});
