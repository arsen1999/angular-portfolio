import {Post} from "../../../../../common/interface";
import {PostService} from "../../../../../common/services";
import {Component, OnInit} from '@angular/core';
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  public posts: Post[] = [];

  constructor(
    private postsService: PostService
  ) {
  }

  public ngOnInit(): void {
    this.getPosts();
  }

  public getPosts(): void {
    this.postsService.getPosts()
      .pipe(
        delay(1200)
      )
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });


  }

}
