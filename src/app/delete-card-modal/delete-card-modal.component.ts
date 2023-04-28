import {Component, OnInit} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {DatabaseService} from "../services/database.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-delete-card-modal',
  templateUrl: './delete-card-modal.component.html',
  styleUrls: ['./delete-card-modal.component.scss']
})
export class DeleteCardModalComponent {
  deckId = '';
  currentUserId = '';
  deckAuthorId: string | null = '';

  constructor(private _modalService: ModalService, private _dbService: DatabaseService, private _route: ActivatedRoute, private _authService: AuthService) {
    this.currentUserId = this._authService.loggedInUserId!;
    this.deckId = this._route.snapshot.paramMap.get('id') as string;
    this._dbService.getDeckAuthorId(this.deckId, this.currentUserId).pipe().subscribe((authorId) => {
      this.deckAuthorId = authorId;
    });
  }

  closeModal() {
    this._modalService.deleteCardModalIsOpen.next(false);
  }

  removeCard() {
    if (this.deckAuthorId === this.currentUserId) {
      const card = this._modalService.selectedCard.value;

      this._dbService.deleteCard(this.deckId, card).subscribe(
        () => this.closeModal()
      )
    } else {
      this.closeModal();
      setTimeout(() => {
        alert('You cannot edit deck that is not your!');
      }, 100);
    }
  }
}
