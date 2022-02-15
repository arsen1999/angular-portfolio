import {Post} from "../../../../../common/interface";
import {PostService} from "../../../../../common/services";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {delay} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  private subscription: Subscription;

  constructor(
    private postsService: PostService
  ) {
  }

  public ngOnInit(): void {
    this.getPosts();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getPosts(): void {
    this.subscription = this.postsService.getPosts()
      .pipe(
        delay(1200)
      )
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });


  }

}
