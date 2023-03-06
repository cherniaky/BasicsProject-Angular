import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { BehaviorSubject, from, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { auth, firebaseApp, firebaseConfig } from 'src/firebase';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // app: FirebaseApp;
  user = new BehaviorSubject<User>(new User('', '', '', new Date()));
  private tokenLogoutTimer: any = null;

  constructor(private router: Router) {}

  signup(email: string, pass: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(auth, email, pass)).pipe(
      catchError((err) => {
        return throwError('An error occurred during signup');
      }),
      tap((data) => {
        this.handleAuth(data);
      })
    );
  }

  autoLogin() {
    const data = localStorage.getItem('userData');
    if (!data) {
      return;
    }

    const userData = JSON.parse(data);
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      );
    }
  }

  login(email: string, pass: string): Observable<UserCredential> {
    // const auth = getAuth(firebaseApp);

    return from(signInWithEmailAndPassword(auth, email, pass)).pipe(
      catchError((err) => {
        return throwError('An error occurred during login');
      }),
      tap((data) => {
        this.handleAuth(data);
      })
    );
  }

  logout() {
    signOut(auth);

    this.user.next(new User('', '', '', new Date()));
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenLogoutTimer) {
      clearTimeout(this.tokenLogoutTimer);
    }
    this.tokenLogoutTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenLogoutTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private async handleAuth(userCredential: UserCredential) {
    const expirationDate = new Date(
      (await userCredential.user.getIdTokenResult()).expirationTime
    );

    const user = new User(
      userCredential.user.email,
      userCredential.user.uid,
      await userCredential.user.getIdToken(),
      expirationDate
    );

    this.autoLogout(expirationDate.getTime() - new Date().getTime());

    this.user.next(user);

    localStorage.setItem('userData', JSON.stringify(user));
  }
}
