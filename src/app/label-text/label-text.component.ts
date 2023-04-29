import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-label-text',
  templateUrl: './label-text.component.html',
  styleUrls: ['./label-text.component.scss']
})
export class LabelTextComponent implements OnInit {
  @Input() label = ''
  @Input() text: string | number = ''

  constructor() { }

  ngOnInit(): void {
  }

}
