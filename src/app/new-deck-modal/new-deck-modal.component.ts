import {Component, OnInit} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {IDeck} from "../../interfaces/interfaces";
import {BehaviorSubject} from "rxjs";
import {DatabaseService} from "../services/database.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-new-deck-modal',
  templateUrl: './new-deck-modal.component.html',
  styleUrls: ['./new-deck-modal.component.scss'],
})
export class NewDeckModalComponent implements OnInit {
  title = '';
  subject = '';
  field = '';
  fieldsEmpty = false;
  fieldsEmptyErrorMessage: string = 'You need to fill all text fields.';


  newDeck: IDeck = {
    id: '',
    title: '',
    subject: '',
    field: '',
    author: 'System',
    authorId: '',
    rating: 3,
    cards: [],
    lastUpdated: ''
  };


  constructor(private _modalService: ModalService, private _dbService: DatabaseService, private _authService: AuthService) {
  }

  ngOnInit(): void {
  }

  createDeck() {
    this.newDeck.id = this.generateId();
    this.newDeck.title = this.title;
    this.newDeck.subject = this.subject;
    this.newDeck.field = this.field;

    const currentUserId = this._authService.loggedInUserId;

    if (currentUserId) {
      this.newDeck.authorId = currentUserId;
    }

    if (this.title.trim() !== '' && this.subject.trim() !== '' && this.field.trim() !== '') {
      this.fieldsEmpty = false;

      this._dbService.addDeck(this.newDeck).subscribe(() => {
        console.log('New deck added successfully.');
        this.closeModal();
      }, (error) => {
        console.error('Error adding new deck:', error);
        this.closeModal();
      });
    } else {
      this.fieldsEmpty = true;

    }
  }

  closeModal() {
    this.title = '';
    this.subject = '';
    this.field = '';
    this._modalService.newDeckModalIsOpen.next(false);
  }

  generateId(): string {
    const random = Math.random();
    const timestampString = new Date().getTime().toString();
    return `${timestampString}_${random}`;
  }
}
