import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}
  public errorMessage = '';

  public signIn(email: string, password: string): void {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['user-account']))
      .catch((response) => {
        this.errorMessage = response.message;
      });
  }

  public createUser(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['main-page']))
      .catch((response) => {
        this.errorMessage = response.message;
      });
    console.log(this.errorMessage);
  }

  public isLoggedIn() {
    return this.firebaseAuth.currentUser !== null;
  }

  // public logOut(): void {
  //   this.firebaseAuth.signOut();
  // }
}
