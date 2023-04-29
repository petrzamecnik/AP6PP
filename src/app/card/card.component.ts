import {Component, Input, OnInit} from '@angular/core';
import {ICard, IDeck} from "../../interfaces/interfaces";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";
import {ModalService} from "../services/modal.service";


export enum ETextType {
  question = 'question',
  answer = 'answer'
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: ICard = {
    answer: "", id: "", question: "", title: ""
  };
  @Input() isEditing!: boolean;

  title: string | undefined = '';
  textType: string = '';
  cardText: string | undefined = '';

  constructor(private _router: Router, private _modalService: ModalService) {

  }

  ngOnInit(): void {
    this.textType = ETextType.question
    this.title = this.card?.title;
    this.cardText = this.card?.question;

  }

  toggleCard() {
    this.textType = this.textType === ETextType.question ? ETextType.answer : ETextType.question;
    this.cardText = this.textType === ETextType.question ? this.card?.question : this.card?.answer;
  }

  onCardClick() {
    if (!this.isEditing) {
      this.toggleCard()
    }
  }

  onEditClick(card: ICard) {
    this._modalService.editCardModalIsOpen.next(true);
    this._modalService.selectedCard.next(card);
  }

  onDeleteClick(card: ICard) {
    this._modalService.deleteCardModalIsOpen.next(true);
    this._modalService.selectedCard.next(card);
  }
}
