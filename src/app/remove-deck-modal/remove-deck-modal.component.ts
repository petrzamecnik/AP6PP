import { Component, OnInit } from '@angular/core';
import {ModalService} from "../services/modal.service";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-remove-deck-modal',
  templateUrl: './remove-deck-modal.component.html',
  styleUrls: ['./remove-deck-modal.component.scss']
})
export class RemoveDeckModalComponent implements OnInit {
  title: any;
  subject: any;
  field: any;

  constructor(private _modalService: ModalService, private _dbService: DatabaseService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this._modalService.removeDeckModalIsOpen.next(false);
  }

  removeDeck() {
    const deckToRemove = this._modalService.selectedDeck.value;

    this._dbService.removeDeck(deckToRemove.id).subscribe(
      () => {
        console.log(`Deck with ID ${deckToRemove.id} deleted successfully`);
        this.closeModal();
        // If you want to update the list of decks after deleting the deck, you can call the `getDecks()` method again
      },
      error => {
        console.error(`Error deleting deck with ID ${deckToRemove.id}: ${error.message}`);
        this.closeModal();
      }
    );
  }
}
