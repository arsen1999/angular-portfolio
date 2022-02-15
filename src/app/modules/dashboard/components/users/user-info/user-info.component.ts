import {map} from "rxjs/operators";
import {Component, OnInit} from '@angular/core';
import {Post, User} from "../../../../../common/interface";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService, UserService} from "../../../../../common/services";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public userId: number;
  public users: User[] = [];
  public posts: Post[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.userId = +params['id'];
        }
      );
    this.getUser();
    this.getPosts();
  }

  public getUser(): void {
    this.userService.getUsers()
      .pipe(
        map(users => users.filter(user => user.id === this.userId))
      )
      .subscribe((res: User[]) => {
        this.users = res;
      });
  }

  public getPosts(): void {
    this.postsService.getPosts()
      .pipe(
        map(posts => {
          this.posts = posts.filter(post => post.userId === this.userId);
        })
      )
      .subscribe();
  }

  public onDelete(): void {
    this.userService.deleteUser(this.userId)
      .subscribe((res) => {
        this.router.navigate(['dashboard/users']);
      });
  }

}
