import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { IDeck } from '../../interfaces/interfaces';
import { DecksService } from '../services/decks.service';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import { ModalService } from '../services/modal.service';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToggleButtonComponent} from "../toggle-button/toggle-button.component";

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
    private _activatedRoute: ActivatedRoute
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
}
