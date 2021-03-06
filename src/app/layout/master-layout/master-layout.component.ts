import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IUserProfile } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.services';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.scss']
})
export class MasterLayoutComponent implements OnInit, OnDestroy {

  @HostBinding('class.master-layout') hostClassName = true;

  userProfile: IUserProfile;
  loginPopupIsShown = false;

  userProfileSubscription: Subscription;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    remember: new FormControl(false),
  });

  loading = {
    login: false,
  };

  constructor(public layoutService: LayoutService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userProfileSubscription = this.authService.getUserProfile().subscribe(user => this.userProfile = user);
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    const { username, password, remember } = this.loginForm.value;
    this.loading.login = true;
    this.authService.login(username, password, remember).pipe(
      finalize(() => this.loading.login = false)
    ).subscribe(_ => {
      if (this.loginPopupIsShown) {
        this.loginPopupIsShown = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
