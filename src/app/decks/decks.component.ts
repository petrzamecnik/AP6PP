import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { IDeck } from '../../interfaces/interfaces';
import { DecksService } from '../services/decks.service';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {BehaviorSubject, map, Observable, Subject} from 'rxjs';
import { ModalService } from '../services/modal.service';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToggleButtonComponent} from "../toggle-button/toggle-button.component";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
})
export class DecksComponent implements OnInit, OnDestroy {
  decks: IDeck[] = [];
  currentUserDecks$ = new BehaviorSubject<IDeck[]>([]);
  newDeckModalIsOpen$ = this._modalService.newDeckModalIsOpen;
  editDeckModalIsOpen$ = this._modalService.editDeckModalIsOpen;
  removeDeckModalIsOpen$ = this._modalService.removeDeckModalIsOpen;
  leftContainerIsExpanded = false;

  private destroy$ = new Subject<void>();

  constructor(
    private _decksService: DecksService,
    private _modalService: ModalService,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _dbService: DatabaseService
  ) {}

  ngOnInit() {
    if (!this._authService.isLoggedIn) {
      this._activatedRoute.url
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          const url = data[0].path;
          this._authService.navigatedFrom$.next(url);
        })

      this._router.navigate(['/login']);
    }
    this._decksService.decks
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          const authorId = this._authService.loggedInUserId;
          this.decks = data.filter(deck => deck.authorId === authorId);
          this.updateCurrentUserDecksCount();
        }
      });

    const rightContainer = document.querySelector('.decks__right-container');
    if (rightContainer) {
      rightContainer.setAttribute('data-left-container-expanded', String(this.leftContainerIsExpanded));
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateCurrentUserDecksCount() {
    this.currentUserDecks$.next(this.decks.filter((deck) => deck.authorId === this._authService.loggedInUserId));
  }

  getOtherUserDeckCount(): number {
    return this.decks.length - this.currentUserDecks$.value.length;
  }

  toggleLeftContainer(): void {
    this.leftContainerIsExpanded = !this.leftContainerIsExpanded;
    const rightContainer = document.querySelector('.decks__right-container');
    if (rightContainer) {
      rightContainer.setAttribute('data-left-container-expanded', String(this.leftContainerIsExpanded));
    }
  }

  onToggleChange(event: boolean) {
    this._decksService.decks
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          if (event) {
            // View all decks
            this.decks = data;
          } else {
            // View only user's decks
            const authorId = this._authService.loggedInUserId;
            this.decks = data.filter(deck => deck.authorId === authorId);
          }
        }
      });
  }

  protected readonly isSecureContext = isSecureContext;

  importDeck(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        const deck = JSON.parse(reader.result as string) as IDeck;
        const currentUserId = this._authService.loggedInUserId;

        if (currentUserId) {
          deck.authorId = currentUserId;
          deck.id = this.generateId();
        }

        this.checkDeckExists(deck).subscribe(exists => {
          if (exists) {
            alert('Deck already exists in database!');
          } else {
            if (deck.title && deck.subject && deck.authorId) {
              this._dbService.addDeck(deck).subscribe(() => {
                this._dbService.getDecks().subscribe();
                alert('Deck imported successfully!');
              });
            } else {
              alert('Error importing deck!')
            }
          }
        });
      } catch (err) {
        console.error(err);
        alert('Error importing deck!');
      }
    };
  }

  generateId(): string {
    const random = Math.random();
    const timestampString = new Date().getTime().toString();
    return `${timestampString}_${random}`;
  }

  private checkDeckExists(deck: IDeck): Observable<boolean> {
    return this._dbService.getDecks().pipe(
      map((decks) => !!decks.find(d => d.id === deck.id))
    );
  }



}
