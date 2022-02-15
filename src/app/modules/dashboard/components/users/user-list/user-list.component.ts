import {User} from "../../../../../common/interface";
import {UserService} from "../../../../../common/services";
import {Component, OnInit} from '@angular/core';
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: User[] = [];

  constructor(
    private userService: UserService,
  ) {
  }

  public ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    // setTimeout(() => {
      this.userService.getUsers()
        .pipe(
          delay(1200)
        )
        .subscribe((users: User[]) => {
          this.users = users;
        });
    // }, 1200)
  }
}
