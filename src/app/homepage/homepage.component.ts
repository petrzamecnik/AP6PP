import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  projectDescription = 'Design a system for student learning - the required application will serve as a tool for creating and sharing\n' +
    '      question and answer card decks. Users will be able to create, import and export card decks, as well as edit,\n' +
    '      delete and add individual cards. Each card will have two question and answer pages. The application will serve as\n' +
    '      a means for sharing and learning among students. The primary direction of the project is to allow students to\n' +
    '      share a collection of questions and answers. Thus, the aim is to facilitate learning and revision of theoretical\n' +
    '      knowledge.'

  teamName = 'Undefined';
  teamMembers = ['Petr', 'Kryštof', 'Marek', 'Jožo'];


  constructor() {
  }

  ngOnInit(): void {
  }

}
