import {Observable} from "rxjs";
import {Component, OnInit} from '@angular/core';
import {Post} from "../../../../../common/interface";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../../../common/services";
import {DeactivateGuard} from "../../../../../common/guards";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, DeactivateGuard {
  public editForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required)
  });
  public editMode: boolean = this.activatedRoute.snapshot.params['id'];
  public post: Post;
  public ifSubmit: boolean = false;

  constructor(
    private router: Router,
    private postsService: PostService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.createForm()
  }

  private createForm(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.editMode = true;
      this.postsService.getPost(this.activatedRoute.snapshot.params['id'])
        .subscribe(
          ((post: Post) => {
            delete post.id;
            delete post.userId;
            this.editForm.setValue(post);
          })
        );
    }
  }

  public onSubmit(addForm: FormGroup): void {
    this.ifSubmit = true;
    if (this.editMode) {
      this.postsService.updatePost(addForm.value, this.activatedRoute.snapshot.params['id'])
        .subscribe(() => {
          this.onCancel();
        });
    } else
      this.postsService.createPost(addForm.value)
      .subscribe(() => {
        this.onCancel();
      });

  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.ifSubmit || !this.editForm.dirty) {
      return true;
    }
    return confirm('Do you really want to exit does not save?');
  }

  public onCancel(): void {
    this.router.navigate(['dashboard/posts']);
  }


}
