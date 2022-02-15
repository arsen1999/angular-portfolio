import {Observable} from "rxjs";
import {Component, OnInit} from '@angular/core';
import {Comment} from "../../../../../common/interface";
import {ActivatedRoute, Router} from "@angular/router";
import {DeactivateGuard} from "../../../../../common/guards";
import {CommentService} from "../../../../../common/services";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit, DeactivateGuard {

  public comment: Comment;
  public editForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    body: new FormControl('', Validators.required)
  });
  public editingMode: boolean = this.activatedRoute.snapshot.params['id'];
  public ifSubmit: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commentsService: CommentService,
  ) {
  }

  public ngOnInit(): void {
    this.createForm()
  }

  private createForm(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.editingMode = true;
      this.commentsService.getComment(this.activatedRoute.snapshot.params['id'])
        .subscribe(((comment: Comment) => {
            delete comment.id;
            delete comment.postId;
            this.editForm.setValue(comment);
          })
        );
    }
  }

  public onSubmit(addForm: FormGroup): void {
    this.ifSubmit = true;

    if (this.editingMode) {
      this.commentsService.updateComment(addForm.value, this.activatedRoute.snapshot.params['id'])
        .subscribe(() => {
          this.onCancel();
        });
    } else this.commentsService.createComment(addForm.value)
      .subscribe(() => {
        this.onCancel();
      });

  }

  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.ifSubmit || !this.editForm.dirty) {
      return true;
    }

    return confirm('Do you really want to exit does not save?');
  }

  public onCancel(): void {
    this.router.navigate(['dashboard/comments']);
  }


}
