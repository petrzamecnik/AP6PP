import {Component, Input, OnInit} from '@angular/core';
import {ICard, IDeck} from "../../interfaces/interfaces";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";


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
  // @Input() deck: IDeck | null = null;
  @Input() card: ICard | null = null;

  title: string | undefined = '';
  textType: string = '';
  cardText: string | undefined = '';



  constructor(private _router: Router) {

  }

  ngOnInit(): void {
    this.textType = ETextType.question
    this.title = this.card?.title;
    this.cardText = this.card?.question;

  }

  protected readonly Array = Array;

  toggleCard() {
    this.textType = this.textType === ETextType.question ? ETextType.answer : ETextType.question;
    this.cardText = this.textType === ETextType.question ? this.card?.question : this.card?.answer;

    console.log(this.card);


  }
}
