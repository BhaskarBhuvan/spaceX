import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit {
  @Output() closeToast = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.closeToast.emit('dismissed');
  }
}
