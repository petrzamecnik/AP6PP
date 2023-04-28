import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ModalService} from "./services/modal.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isModalOpen = false;

  constructor(private _modalService: ModalService) {
    this._modalService.isModalOpen.subscribe((isOpen) => this.isModalOpen = isOpen);
  }

}
