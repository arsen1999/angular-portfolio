import {Component, OnInit} from '@angular/core';
import {User} from "../../../../../common/interface";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../common/services";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  public editMode: boolean = this.activatedRoute.snapshot.params['id'];
  public user: User;
  private ifSubmit = false

  public addForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      suite: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zipcode: new FormControl('', Validators.required),
      geo: new FormGroup({
        lat: new FormControl('', Validators.required),
        lng: new FormControl('', Validators.required)
      })
    }),
    phone: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    company: new FormGroup({
      name: new FormControl('', Validators.required),
      catchPhrase: new FormControl('', Validators.required),
      bs: new FormControl('', Validators.required),
    })
  });


  constructor(
    private router: Router,
    private usersService: UserService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    if (this.editMode) {
      this.getUsers();
    }
  }


  private getUsers(): void {
    this.usersService.getUser(this.activatedRoute.snapshot.params['id'])
      .subscribe(
        ((user: User) => {
          delete user.id;
          this.addForm.setValue(user);
        })
      );
  }

  public canDeactivate(): boolean {
    if (!this.addForm.dirty || this.ifSubmit) {
      return true;
    }

    return confirm('Do you really want to exit does not save?');
  }

  public onSubmit(addForm: FormGroup) {
    this.ifSubmit = true
    if (this.editMode) {
      this.usersService.updateUser(addForm.value, this.activatedRoute.snapshot.params['id'])
        .subscribe(() => {
          this.onCancel();
        });
    } else {
      this.createUser();
    }

  }

  private createUser(): void {
    this.usersService.createUser(this.addForm.value)
      .subscribe(() => {
        this.onCancel();
      });
  }

  public onCancel(): void {
    this.router.navigate(['dashboard/users']);
  }


}
