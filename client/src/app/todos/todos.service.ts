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
}
