import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {IDeck} from "../../interfaces/interfaces";

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  newDeckModalIsOpen = new BehaviorSubject<boolean>(false);
  editDeckModalIsOpen = new BehaviorSubject<boolean>(false);
  removeDeckModalIsOpen = new BehaviorSubject<boolean>(false);
  loginModalIsOpen = new BehaviorSubject<boolean>(false);

  selectedDeck = new BehaviorSubject<IDeck>({
    id: '',
    title: '',
    subject: '',
    field: '',
    author: 'System',
    authorId: '',
    rating: 3,
    cards: [],
    lastUpdated: ''
  });

  constructor() {}
}
