import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { Router } from '@angular/router';

import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.firebaseAuth.user.subscribe((user) => {
      this.currentUserId.next(user?.uid || null);
      this.currentUserEmail = user?.email || null;
    });
  }
  public errorMessage = '';
  public currentUserId = new ReplaySubject<string>();
  public currentUserEmail: string;

  public signIn(email: string, password: string): void {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['user-account']);
      })
      .catch((response) => {
        this.errorMessage = response.message;
      });
  }

  public signOut(): void {
    this.firebaseAuth
      .signOut()
      .then(() => {
        this.router.navigate(['sign-in-page']);
      })
      .catch((response) => {
        this.errorMessage = response.message;
      });
  }

  public async createUser(email: string, password: string): Promise<string> {
    try {
      const credentials = await this.firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.router.navigate(['user-account']);
      return credentials.user.uid;
    } catch (e) {
      this.errorMessage = e.message;
    }
  }

  public isLoggedIn() {
    return this.firebaseAuth.currentUser !== null;
  }

  public getUserId(): Observable<string> {
    return this.currentUserId;
  }

  public getUserEmail(): string {
    return this.currentUserEmail;
  }

  public resetPassword(email: string) {
    return this.firebaseAuth.sendPasswordResetEmail(email);
  }
}
