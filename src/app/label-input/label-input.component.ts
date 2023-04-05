import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export enum EInputLabelType {
  text = 'text',
  password = 'password'
}

@Component({
  selector: 'app-label-input',
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.scss'],
})
export class LabelInputComponent implements OnInit {
  @Input() inputValue: any;
  @Input() label: any;
  @Input() type: any;
  @Output() inputValueChange = new EventEmitter<string>();


  constructor() {
  }

  ngOnInit(): void {
  }

  onInputChange(e: Event) {
    const inputElement = e.target as HTMLInputElement;
    const inputValue = inputElement.value;
    this.inputValueChange.emit(inputValue);
  }
}
