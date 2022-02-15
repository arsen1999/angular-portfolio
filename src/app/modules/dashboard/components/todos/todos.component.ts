import {Todo} from "../../../../common/interface";
import {TodoService} from "../../../../common/services";
import {Component, OnInit} from '@angular/core';
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public todos: Todo[] = [];
  public searchText: string = '';

  constructor(
    private todosService: TodoService
  ) {
  }

  public ngOnInit(): void {
    this.getTodos();
  }

  public getTodos(): void {
    this.todosService.getTodos()
      .pipe(
        delay(700))
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
      });

  }
}
