import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from 'rxjs';
import {ICard, IDeck} from '../../interfaces/interfaces';
import { DecksService } from '../services/decks.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-deck-view',
  templateUrl: './deck-view.component.html',
  styleUrls: ['./deck-view.component.scss'],
})
export class DeckViewComponent implements OnInit, AfterViewInit {

  decks: IDeck[] = [];
  selectedDeck: IDeck = {
    author: "", authorId: "", cards: [], field: "", id: "", lastUpdated: "", rating: 0, subject: "", title: ""
  }
  cards: ICard[] = []
  leftContainerIsExpanded = false;



  private destroy$: Subject<void> = new Subject<void>();


  constructor(private _decksService: DecksService, private _router: Router) {  }

  ngOnInit() {
    this._decksService.decks
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.decks = data;
        }
      })

    this._decksService.selectedDeck
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.selectedDeck = data;
          this.cards = this.selectedDeck.cards;
        }
      })

    const rightContainer = document.querySelector('.deck-view__right-container');
    if (rightContainer) {
      rightContainer.setAttribute('data-left-container-expanded', String(this.leftContainerIsExpanded));
    }
  }

  ngAfterViewInit() {
    if (this.cards.length === 0) {
      // this._router.navigate(['/decks']);
    }
  }


  toggleLeftContainer(): void {
    this.leftContainerIsExpanded = !this.leftContainerIsExpanded;
    const rightContainer = document.querySelector('.deck-view__right-container');
    if (rightContainer) {
      rightContainer.setAttribute('data-left-container-expanded', String(this.leftContainerIsExpanded));
    }
  }


  testButton() {
    console.log('test button clicked');
    console.log('decks: ', this.decks);
    console.log('selected deck: ', this.selectedDeck)
  }
}
