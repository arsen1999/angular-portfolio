import {User} from "../../../../../common/interface";
import {UserService} from "../../../../../common/services";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {delay} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  private subscription: Subscription;

  constructor(
    private userService: UserService,
  ) {
  }

  public ngOnInit(): void {
    this.getUsers();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getUsers(): void {
    this.subscription = this.userService.getUsers()
      .pipe(
        delay(1200)
      )
      .subscribe((users: User[]) => {
        this.users = users;
      });

  }
}
