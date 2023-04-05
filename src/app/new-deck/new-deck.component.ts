import { Component, OnInit } from '@angular/core';
import {ModalService} from "../services/modal.service";

@Component({
  selector: 'app-new-deck',
  templateUrl: './new-deck.component.html',
  styleUrls: ['./new-deck.component.scss']
})
export class NewDeckComponent implements OnInit {

  constructor(private _modalService: ModalService) { }

  ngOnInit(): void {
  }

  openNewDeckModal() {
    this._modalService.newDeckModalIsOpen.next(true);
  }
}
