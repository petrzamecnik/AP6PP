import { Injectable } from '@angular/core';
import { DatabaseService } from "./database.service";
import { IDeck } from "../../interfaces/interfaces";
import {BehaviorSubject, Subject} from "rxjs";
import {ModalService} from "./modal.service";

@Injectable({
  providedIn: 'root'
})
export class DecksService {
  public decks = new BehaviorSubject<IDeck[]>([]);
  public selectedDeck = new BehaviorSubject<IDeck | undefined>(undefined);

  constructor(private _dbService: DatabaseService) {
    this._dbService.getDecks().subscribe((data) => {
      this.decks.next(data);
    });

    this._dbService.decksChanged.subscribe(() => {
      this.refreshDecks();
    })
  }

  refreshDecks(): void {
    this._dbService.getDecks().subscribe((data) => {
      this.decks.next(data);
    });
  }

}
