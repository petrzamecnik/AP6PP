import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from 'rxjs';
import {ICard, IDeck} from '../../interfaces/interfaces';
import {DecksService} from '../services/decks.service';
import {ActivatedRoute, Router} from "@angular/router";
import {DatabaseService} from "../services/database.service";
import {ModalService} from "../services/modal.service";

@Component({
  selector: 'app-deck-view',
  templateUrl: './deck-view.component.html',
  styleUrls: ['./deck-view.component.scss'],
})
export class DeckViewComponent implements OnInit, AfterViewInit {

  selectedDeck: IDeck = {
    author: "", authorId: "", cards: [], field: "", id: "", lastUpdated: "", rating: 0, subject: "", title: ""
  }
  cards: ICard[] = []
  leftContainerIsExpanded = false;
  editing = false;

  private destroy$: Subject<void> = new Subject<void>();

  newCardModalIsOpen$ = this._modalService.newCardModalIsOpen;
  editCardModalIsOpen$ = this._modalService.editCardModalIsOpen;
  deleteCardModalIsOpen$ = this._modalService.deleteCardModalIsOpen;

  constructor(private _modalService: ModalService, private _decksService: DecksService, private _router: Router, private _route: ActivatedRoute, private _dbService: DatabaseService) {
  }

  ngOnInit() {
    this._decksService.selectedDeck
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.selectedDeck = data;
          this.cards = this.selectedDeck.cards;
        }
      })

    this._dbService.decksChanged.subscribe(() => {
      this.getCards();
    });

    const rightContainer = document.querySelector('.deck-view__right-container');
    if (rightContainer) {
      rightContainer.setAttribute('data-left-container-expanded', String(this.leftContainerIsExpanded));
    }
  }

  ngAfterViewInit() {
    if (!this.cards.length) {
      const deckId = this._route.snapshot.paramMap.get('id') as string;
      console.log(deckId)
      this._dbService.getCardsByDeckId(deckId).pipe().subscribe((res) => {
        if (res) {
          this.cards = res;
        }
      });
    }
  }

  getCards() {
    const deckId = this._route.snapshot.paramMap.get('id') as string;


    this._dbService.getCardsByDeckId(deckId).subscribe(
      cards => {
        this.cards = cards;
      },
      error => {
        console.error('Error fetching cards:', error);
      }
    );
  }

  toggleLeftContainer(): void {
    this.leftContainerIsExpanded = !this.leftContainerIsExpanded;
    const rightContainer = document.querySelector('.deck-view__right-container');
    if (rightContainer) {
      rightContainer.setAttribute('data-left-container-expanded', String(this.leftContainerIsExpanded));
    }
  }

  toggleEditing() {
    this.editing = !this.editing;
  }
}
