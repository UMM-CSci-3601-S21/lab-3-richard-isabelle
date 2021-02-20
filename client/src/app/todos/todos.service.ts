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

  getTodos(filters?: { status?: TodosStatus; owner?: string; body?: string}): Observable<Todos[]> {
    let httpParams: HttpParams = new HttpParams();
    if(filters) {
      if(filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);
      }
      if(filters.body) {
        httpParams = httpParams.set('body', filters.body);
      }
      if(filters.status) {
        httpParams = httpParams.set('status', filters.status);
      }
    }
    return this.httpClient.get<Todos[]>(this.todosUrl, {
      params: httpParams,
    });
  }

  getTodoById(id: string): Observable<Todos> {
    return this.httpClient.get<Todos>(this.todosUrl + '/' + id);
  }

  filterTodos(todos: Todos[], filters: { category?: string }): Todos[] {

    let filteredTodos = todos;

    if(filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    }

    return filteredTodos;
  }
}
