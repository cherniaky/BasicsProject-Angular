import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input() massage: string;
  @Output() close = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}

  onClose() {
    this.close.emit();
  }
}
