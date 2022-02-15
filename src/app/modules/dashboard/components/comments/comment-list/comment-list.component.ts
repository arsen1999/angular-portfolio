import {Comment} from "../../../../../common/interface";
import {CommentService} from "../../../../../common/services";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {delay} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnDestroy {
  public comments: Comment[] = [];
  private subscription: Subscription;

  constructor(
    private commentsService: CommentService
  ) {
  }

  public ngOnInit(): void {
    this.getComments();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  public getComments(): void {
    this.subscription = this.commentsService.getComments()
      .pipe(
        delay(800)
      )
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      });

  }
}
