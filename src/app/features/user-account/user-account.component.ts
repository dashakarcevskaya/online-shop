import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';
// import {} from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.less']
})
export class UserAccountComponent implements OnInit {
  constructor(private userService: UserService, private auth: AuthService) {}
  public currentUser: any;
  public userName: string;
  public userSurname: string;
  public isChangeName = false;
  public isChangeSurname = false;

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.currentUser = user[0];
    });
  }

  public logOut(): void {
    this.auth.signOut();
  }

  public getUserEmail(): string {
    return this.auth.getUserEmail();
  }

  public showNameEditor(): void {
    this.isChangeName = !this.isChangeName;
  }

  public showSurnameEditor(): void {
    this.isChangeSurname = !this.isChangeSurname;
  }

  public changeUserName(): void {
    this.isChangeName = false;
    this.userService.changeName(this.userName.toLowerCase());
    this.userName = '';
  }

  public changeUserSurname(): void {
    this.isChangeSurname = false;
    this.userService.changeSurname(this.userSurname.toLowerCase());
    this.userSurname = '';
  }
}
