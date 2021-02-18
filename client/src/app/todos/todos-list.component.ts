import { Component, OnInit } from '@angular/core';
import { Todos , TodosStatus } from './todos';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos-list',
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

  constructor(private todosService: TodosService) { }
/*
  getTodosFromServer() {
    this.todosService.getTodos({
      owner: this.todosOwner,
      status: this.todosStatus,
      body: this.todosBody,
      category: this.todosCategory,
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    });
  }

  /**
   * This method filters through the client side
  /
  public updateFilter(){
    this.filteredTodos = this.todosService.filterTodos(
      this.serverFilteredTodos, { owner: this.todosOwner,
      category: this.todosCategory });
  }
*/
  ngOnInit(): void {
  }


}
