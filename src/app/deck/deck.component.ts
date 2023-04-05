import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDeck} from "../../interfaces/interfaces";
import {DecksService} from "../services/decks.service";
import {Router} from "@angular/router";
import {ModalService} from "../services/modal.service";


@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  @Input() deck?: IDeck;
  @Output() selectedDeck = new EventEmitter<IDeck>();

  constructor(private _deckService: DecksService, private _router: Router, private _modalService: ModalService) { }



  ngOnInit(): void {
  }


  protected readonly Array = Array;

  onDeckClick(deck: IDeck | undefined) {
    if (deck) {
      this._deckService.selectedDeck.next(deck);
      this._router.navigate(['/deck-view', deck.id])
    }
  }

  onRemoveDeckClick(event: MouseEvent, deck: IDeck | undefined) {
    event.stopPropagation()

    if (deck) {
      this._modalService.selectedDeck.next(deck);
      this._modalService.removeDeckModalIsOpen.next(true);
    }

    console.log('remove deck');
  }

  onEditDeckClick(event: MouseEvent, deck: IDeck | undefined) {
    event.stopPropagation()

    if (deck) {
      this._modalService.selectedDeck.next(deck);
      this._modalService.editDeckModalIsOpen.next(true);
    }

    console.log('edit deck');
  }
}
