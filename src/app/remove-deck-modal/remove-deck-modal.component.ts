import { Component, OnInit } from '@angular/core';
import {ModalService} from "../services/modal.service";
import {DatabaseService} from "../services/database.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-remove-deck-modal',
  templateUrl: './remove-deck-modal.component.html',
  styleUrls: ['./remove-deck-modal.component.scss']
})
export class RemoveDeckModalComponent implements OnInit {
  title: any;
  subject: any;
  field: any;

  constructor(private _modalService: ModalService, private _dbService: DatabaseService, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this._modalService.removeDeckModalIsOpen.next(false);
  }

  removeDeck() {
    const deckToRemove = this._modalService.selectedDeck.value;
    const currentUserId = this._authService.loggedInUserId;

    if (deckToRemove.authorId === currentUserId) {
      this._dbService.removeDeck(deckToRemove.id).subscribe(
        () => {
          this.closeModal();
        },
        error => {
          console.error(`Error deleting deck with ID ${deckToRemove.id}: ${error.message}`);
          this.closeModal();
        }
      )
    } else {
      this.closeModal();
      setTimeout(() => {
        alert('You cannot remove deck that is not your!');
      }, 100);
    }
  }
}
