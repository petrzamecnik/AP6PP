import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {
  @Output() toggleChange = new EventEmitter<boolean>();
  isOn = false;


  toggle() {
    this.isOn = !this.isOn;
    this.toggleChange.emit(this.isOn);
  }
}
