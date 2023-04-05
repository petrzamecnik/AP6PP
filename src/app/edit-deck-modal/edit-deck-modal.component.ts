import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {distinctUntilChanged, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {IDeck} from "../../interfaces/interfaces";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-edit-deck-modal',
  templateUrl: './edit-deck-modal.component.html',
  styleUrls: ['./edit-deck-modal.component.scss']
})
export class EditDeckModalComponent implements OnInit, OnDestroy {
  title: string = '';
  subject: string = '';
  field: string = '';

  deckToEdit: IDeck = {
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

  private destroy$ = new Subject<void>();


  constructor(private _modalService: ModalService, private _dbService: DatabaseService) {
  }

  ngOnInit(): void {
    this.deckToEdit = this._modalService.selectedDeck.value;
    this.title = this.deckToEdit.title;
    this.subject = this.deckToEdit.subject;
    this.field = this.deckToEdit.field;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  closeModal() {
    this._modalService.editDeckModalIsOpen.next(false);
  }

  editDeck() {
    this.deckToEdit = this._modalService.selectedDeck.value;

    this.deckToEdit.title = this.title;
    this.deckToEdit.subject = this.subject;
    this.deckToEdit.field = this.field;

    this._dbService.updateDeck(this.deckToEdit).subscribe(
      () => {
        console.log(`Deck with ID ${this.deckToEdit.id} updated successfully`);
        this.closeModal();
      },
      error => {
        console.error(`Error updating deck with ID ${this.deckToEdit.id}: ${error.message}`);
        this.closeModal();
      }
    )


    console.log(this.deckToEdit)
  }
}
