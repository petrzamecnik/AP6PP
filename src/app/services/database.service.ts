import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, map, Observable, of, Subject, switchMap, tap} from 'rxjs';
import {ICard, IDeck, IUser} from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private baseUrl = 'http://localhost:3000';
  public decksChanged = new Subject<void>();
  public cardsChanged = new Subject<void>();

  constructor(private _http: HttpClient) {
  }

  getDecks(): Observable<IDeck[]> {
    return this._http.get<IDeck[]>(`${this.baseUrl}/decks`);
  }

  getDeckAuthorId(deckId: string, userId: string): Observable<string | null> {
    const url = `${this.baseUrl}/decks/${deckId}`;

    return this._http.get<IDeck>(url).pipe(
      map(deck => {
        if (deck.authorId === userId) {
          return deck.authorId;
        } else {
          return null;
        }
      })
    );

  }

  getCardsByDeckId(id: string): Observable<ICard[]> {
    const deckUrl = `${this.baseUrl}/decks/${id}`;

    return this._http.get<IDeck>(deckUrl).pipe(
      map(deck => deck.cards)
    );
  }

  getDeckById(id: string): Observable<IDeck> {
    const deckUrl = `${this.baseUrl}/decks/${id}`;

    return this._http.get<IDeck>(deckUrl);
  }

  addDeck(deck: IDeck): Observable<IDeck> {
    this.decksChanged.next();
    return this._http.post<IDeck>(`${this.baseUrl}/decks`, deck)
      .pipe(
        tap(() => {
          this.decksChanged.next();
        })
      );
  }

  updateDeck(deck: IDeck): Observable<IDeck> {
    const url = `${this.baseUrl}/decks/${deck.id}`
    this.decksChanged.next();
    return this._http.put<IDeck>(url, deck)
      .pipe(
        tap(() => {
          this.decksChanged.next();
        })
      );
  }

  removeDeck(deckId: string): Observable<IDeck> {
    const url = `${this.baseUrl}/decks/${deckId}`;
    return this._http.delete<IDeck>(url)
      .pipe(
        tap(() => {
          this.decksChanged.next();
        })
      );
  }

  addCard(deckId: string, card: ICard): Observable<IDeck> {
    const url = `${this.baseUrl}/decks/${deckId}`;

    return this._http.get<IDeck>(url).pipe(
      switchMap((deck: IDeck) => {
        deck.cards.push(card);
        return this._http.put<IDeck>(url, deck)
          .pipe(
            tap(() => {
              this.decksChanged.next();
            })
          );
      })
    );
  }

  updateCard(deckId: string, card: ICard): Observable<IDeck> {
    const url = `${this.baseUrl}/decks/${deckId}`;

    return this._http.get<IDeck>(url).pipe(
      switchMap(deck => {
        const updatedDeck = {
          ...deck,
          cards: deck.cards.map(c => c.id === card.id ? card : c)
        };

        return this._http.put<IDeck>(url, updatedDeck);
      }),
      tap(() => this.decksChanged.next())
    );
  }

  deleteCard(deckId: string, card: ICard): Observable<IDeck> {
    const url = `${this.baseUrl}/decks/${deckId}`;

    return this._http.get<IDeck>(url).pipe(
      switchMap(deck => {
        const updatedCards = deck.cards.filter(c => c.id !== card.id);
        const updatedDeck = { ...deck, cards: updatedCards };

        return this._http.put<IDeck>(url, updatedDeck);
      }),
      tap(() => this.decksChanged.next())
    );
  }

  getUserByEmail(email: string): Observable<IUser> {
    const url = `${this.baseUrl}/users?email=${email}`;

    return this._http.get<IUser[]>(url)
      .pipe(
        map(users => users.length > 0 ? users[0] : null),
        catchError(error => {
          console.error(error);
          return of(null);
        }),
        filter(user => user !== null),
        switchMap(user => of(user as IUser))
      );
  }

  getAllUsers(): Observable<IUser[]> {
    const url = `${this.baseUrl}/users`;

    return this._http.get<IUser[]>(url);
  }

  addNewUser(user: IUser) {
    return this._http.post<IUser>(`${this.baseUrl}/users`, user);
  }


}
