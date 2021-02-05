import { Component, Input, OnInit } from '@angular/core';
import { mission } from 'src/app/model/mission.model';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss'],
})
export class MissionComponent implements OnInit {
  @Input() mission: mission;
  constructor() {}

  ngOnInit(): void {}
}
