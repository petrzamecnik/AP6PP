import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ICard, IDeck} from "../../interfaces/interfaces";

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  newDeckModalIsOpen = new BehaviorSubject<boolean>(false);
  editDeckModalIsOpen = new BehaviorSubject<boolean>(false);
  removeDeckModalIsOpen = new BehaviorSubject<boolean>(false);
  loginModalIsOpen = new BehaviorSubject<boolean>(false);
  newCardModalIsOpen = new BehaviorSubject<boolean>(false);
  editCardModalIsOpen = new BehaviorSubject<boolean>(false);
  deleteCardModalIsOpen = new BehaviorSubject<boolean>(false);
  isModalOpen = new BehaviorSubject<boolean>(false);

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

  selectedCard = new BehaviorSubject<ICard>({
    answer: "", id: "", question: "", title: ""
  })

  constructor() {
    this.newDeckModalIsOpen.subscribe(value => this.updateIsModalOpen(value));
    this.editDeckModalIsOpen.subscribe(value => this.updateIsModalOpen(value));
    this.removeDeckModalIsOpen.subscribe(value => this.updateIsModalOpen(value));
    this.loginModalIsOpen.subscribe(value => this.updateIsModalOpen(value));
    this.newCardModalIsOpen.subscribe(value => this.updateIsModalOpen(value));
    this.editCardModalIsOpen.subscribe(value => this.updateIsModalOpen(value));
    this.deleteCardModalIsOpen.subscribe(value => this.updateIsModalOpen(value))

  }

  private updateIsModalOpen(value: boolean) {
    this.isModalOpen.next(
      this.newDeckModalIsOpen.value ||
      this.editDeckModalIsOpen.value ||
      this.removeDeckModalIsOpen.value ||
      this.loginModalIsOpen.value ||
      this.newCardModalIsOpen.value ||
      this.editCardModalIsOpen.value ||
      this.deleteCardModalIsOpen.value
    );
  }
}
