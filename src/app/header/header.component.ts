import {Component, OnDestroy, OnInit} from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn?: boolean;

  private _destroy$ = new Subject<void>();

  constructor(
    private _modalService: ModalService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._authService.isLoggedIn$
      .pipe(takeUntil(this._destroy$))
      .subscribe((isLoggedIn) => (this.isLoggedIn = isLoggedIn));
  }

  onClickLogout() {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
