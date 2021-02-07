import { Component, Input } from '@angular/core';
import { mission } from 'src/app/model/mission.model';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss'],
})
export class MissionComponent {
  /** it holds mission details */
  @Input() mission: mission;

  /**
   * constructor MissionComponent class
   */
  constructor() {}
}
