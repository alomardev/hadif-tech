import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import LocalData from "src/local.data";
import { IUserProfile } from "../models/user";
import { delayedError, delayedSuccess } from "../utils/common-functions";

const LocalStorageKeys = {
  userProfile: 'UserProfile',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userProfile: BehaviorSubject<IUserProfile>;

  constructor() {
    const localStorageValue = localStorage.getItem(LocalStorageKeys.userProfile);
    this.userProfile = new BehaviorSubject<IUserProfile>(localStorageValue ? JSON.parse(localStorageValue) : null);
  }

  getUserProfile() {
    return this.userProfile;
  }

  login(username: string, password: string, remember: boolean = false): Observable<IUserProfile> {
    const user = LocalData.getUser(username, password);
    if (user) {
      return delayedSuccess(user).pipe(tap(u => {
        this.userProfile.next(u);
        if (remember) {
          localStorage.setItem(LocalStorageKeys.userProfile, JSON.stringify(u));
        } else {
          localStorage.removeItem(LocalStorageKeys.userProfile);
        }
      }));
    } else {
      return delayedError<IUserProfile>('Couldn\'t perform login');
    }
  }

  logout() {
    localStorage.removeItem(LocalStorageKeys.userProfile);
    this.userProfile.next(null);
  }
}
