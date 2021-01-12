import { Injectable } from '@angular/core';
import { User } from '@core/types/user';
import { AuthService } from '@core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public id: string;
  constructor(private db: AngularFirestore, private auth: AuthService) {}

  public getUser(): Observable<User[]> {
    return this.db
      .collection<User>('/users', (ref) => {
        return ref.where('uid', '==', this.auth.getUserId());
      })
      .snapshotChanges()
      .pipe(
        map((items) =>
          items.map((item) => {
            const data = item.payload.doc.data();
            const id = item.payload.doc.id;
            this.id = id;
            return { id, ...data } as User;
          })
        )
      );
  }

  public getId(): string {
    return this.auth.getUserId();
  }

  public addNewUser(name: string, surname: string, id: string): void {
    this.db.collection<User>('/users').add({
      uid: id,
      name: name,
      surname: surname,
      sity: '',
      street: '',
      house: null,
      apartment: null
    });
  }

  public changeName(name: string): void {
    this.db.doc<User>(`users/${this.id}`).update({ name: name });
  }

  public changeSurname(surname: string): void {
    this.db.doc<User>(`users/${this.id}`).update({ surname: surname });
  }

  public changeAddress(
    sity: string,
    street: string,
    house: number,
    apartment: number
  ): void {
    this.db
      .doc<User>(`users/${this.id}`)
      .update({ sity, street, house, apartment });
  }
}
