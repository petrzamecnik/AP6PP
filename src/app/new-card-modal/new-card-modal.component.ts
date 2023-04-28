import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import {ICard} from "../../interfaces/interfaces";
import {AuthService} from "../services/auth.service";
import {DatabaseService} from "../services/database.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-new-card-modal',
  templateUrl: './new-card-modal.component.html',
  styleUrls: ['./new-card-modal.component.scss'],
})
export class NewCardModalComponent {
  title = '';
  question = '';
  answer = '';
  fieldsEmpty = false;
  fieldsEmptyErrorMessage: string = 'You need to fill all text fields.';
  deckId = '';
  currentUserId = '';
  deckAuthorId: string | null = '';

  newCard: ICard = {
    answer: "",
    id: "",
    question: "",
    title: ""
  }

  constructor(private _modalService: ModalService, private _dbService: DatabaseService, private _route: ActivatedRoute, private _authService: AuthService) {
    this.currentUserId = this._authService.loggedInUserId!;
    this.deckId = this._route.snapshot.paramMap.get('id') as string;
    this._dbService.getDeckAuthorId(this.deckId, this.currentUserId).pipe().subscribe((authorId) => {
      this.deckAuthorId = authorId;
    });
  }

  closeModal() {
    this.title = '';
    this.question = '';
    this.answer = '';
    this._modalService.newCardModalIsOpen.next(false);
  }

  generateId(): string {
    const random = Math.random();
    const timestampString = new Date().getTime().toString();
    return `${timestampString}_${random}`;
  }

  createCard() {
    if (this.title.trim() !== '' && this.question.trim() !== '' && this.answer.trim() !== '') {
      this.newCard.id = this.generateId();
      this.newCard.title = this.title;
      this.newCard.question = this.question;
      this.newCard.answer = this.answer;
      this.fieldsEmpty = false;

      if (this.deckAuthorId === this.currentUserId) {
        this._dbService.addCard(this.deckId, this.newCard).subscribe(() => {
          console.log('New card added');
          this.closeModal();
        }, (error) => {
          console.log('Error adding new card', error);
          this.closeModal();
        })
      } else {
        this.closeModal();
        setTimeout(() => {
          alert('You cannot edit deck that is not your!');
        }, 100);
      }

    } else {
      this.fieldsEmpty = true;
    }
  }
}
