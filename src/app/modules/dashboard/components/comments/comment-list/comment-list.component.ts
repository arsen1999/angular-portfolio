import {Comment} from "../../../../../common/interface";
import {CommentService} from "../../../../../common/services";
import {Component, OnInit} from '@angular/core';
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  public comments: Comment[] = [];

  constructor(
    private commentsService: CommentService
  ) {
  }

  public ngOnInit(): void {
    this.getComments();
  }


  public getComments(): void {
      this.commentsService.getComments()
        .pipe(
          delay(800)
        )
        .subscribe((comments: Comment[]) => {
          this.comments = comments;
        });

  }
}
