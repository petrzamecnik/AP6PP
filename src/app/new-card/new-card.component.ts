import { Component, OnInit } from '@angular/core';
import {ModalService} from "../services/modal.service";

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit {

  constructor(private _modalService: ModalService) { }

  ngOnInit(): void {
  }

  openNewCardModal() {
    this._modalService.newCardModalIsOpen.next(true);
  }
}
