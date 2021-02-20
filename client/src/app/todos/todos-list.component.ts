import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todos , TodosStatus } from './todos';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos-list-component',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  providers: []
})

export class TodosListComponent implements OnInit {
  public serverFilteredTodos: Todos[];
  public filteredTodos: Todos[];

  public todosOwner: string;
  public todosStatus: TodosStatus;
  public todosBody: string;
  public todosCategory: string;

  constructor(private todosService: TodosService, private snackBar: MatSnackBar) { }

  getTodosFromServer() {
    this.todosService.getTodos({
      status: this.todosStatus,
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      this.snackBar.open(
        'Problem contacting the server - please try again',
        'OK',
        {duration: 3000});
    });
  }

  /*
   * This method filters through the client side
  */
  public updateFilter(){
    this.filteredTodos = this.todosService.filterTodos(
      this.serverFilteredTodos, { category: this.todosCategory, owner: this.todosOwner, body: this.todosBody });
  }

  /**
   * Starts an asynchronous operation to update the todos list
   */
  ngOnInit(): void {
    this.getTodosFromServer();
  }
}
