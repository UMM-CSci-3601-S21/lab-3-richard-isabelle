import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todos, TodosStatus } from './todos';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  readonly todosUrl: string = environment.apiUrl + 'todos';

  constructor(private httpClient: HttpClient) { }

  getTodos(filters?: { status?: TodosStatus }): Observable<Todos[]> {
    let httpParams: HttpParams = new HttpParams();
    if(filters) {
      if(filters.status) {
        httpParams = httpParams.set('status', filters.status);
      }
    }
    return this.httpClient.get<Todos[]>(this.todosUrl, {
      params: httpParams,
    });
  }

  getTodosById(id: string): Observable<Todos> {
    return this.httpClient.get<Todos>(this.todosUrl + '/' + id);
  }

  filterTodos(todos: Todos[], filters: { category?: string; owner?: string; body?: string; limit?: number}): Todos[] {

    let filteredTodos = todos;

    if(filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    }
    if(filters.owner) {
      filters.owner = filters.owner.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner) !== -1);
    }
    if(filters.body) {
      filters.body = filters.body.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.body.toLowerCase().indexOf(filters.body) !== -1);
    }
    if(filters.limit) {
      filteredTodos = filteredTodos.slice(0,filters.limit);
    }
    return filteredTodos;
  }
}
