import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {ICard} from "../../interfaces/interfaces";
import {DatabaseService} from "../services/database.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-edit-card-modal',
  templateUrl: './edit-card-modal.component.html',
  styleUrls: ['./edit-card-modal.component.scss']
})
export class EditCardModalComponent implements OnInit {
  title = '';
  question = '';
  answer = '';
  fieldsEmpty = false;
  fieldsEmptyErrorMessage: string = 'You need to fill all text fields.';
  currentUserId = '';
  deckId = '';
  deckAuthorId: string | null = '';

  @Input() card!: ICard;

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

  ngOnInit(): void {
    this.newCard = this._modalService.selectedCard.value;
    this.title = this.newCard.title;
    this.question = this.newCard.question;
    this.answer = this.newCard.answer;
  }

  closeModal() {
    this._modalService.editCardModalIsOpen.next(false);
  }

  editCard() {
    if (this.title.trim() !== '' && this.question.trim() !== '' && this.answer.trim() !== '') {
      if (this.deckAuthorId === this.currentUserId) {
        this.newCard = this._modalService.selectedCard.value;
        this.newCard.title = this.title;
        this.newCard.question = this.question;
        this.newCard.answer = this.answer;
        this.fieldsEmpty = false;

        this._dbService.updateCard(this.deckId, this.newCard).subscribe(
          () => {
            this.closeModal();
          },
          error => {
            this.closeModal();
          }
        )
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
