import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  // @ViewChild('authForm') authForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;

    let authObs: Observable<UserCredential>;
    if (this.isLoginMode) {
      authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      authObs = this.authService.signup(form.value.email, form.value.password);
    }

    this.authSubscription = authObs.subscribe(
      (userCredentials) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (err) => {
        this.error = err;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
