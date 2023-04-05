import { Component, OnInit } from '@angular/core';
import {ModalService} from "../services/modal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _modalService: ModalService, private _router: Router) { }

  ngOnInit(): void {
  }

  openLoginModal() {
    // this._modalService.loginModalIsOpen.next(true);
    this._router.navigate(['/login']);
  }
}
