import {Todo} from "../../../../common/interface";
import {TodoService} from "../../../../common/services";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {delay} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
  public todos: Todo[] = [];
  public searchText: string = '';
  private subscription: Subscription;

  constructor(
    private todosService: TodoService
  ) {
  }

  public ngOnInit(): void {
    this.getTodos();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getTodos(): void {
    this.subscription = this.todosService.getTodos()
      .pipe(
        delay(700))
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
      });

  }
}
