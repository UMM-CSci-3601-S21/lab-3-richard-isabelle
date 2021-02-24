import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todos, TodosStatus } from '../app/todos/todos';
import { TodosService } from '../app/todos/todos.service';

/**
 * A "mock" version of the `TodosService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockTodosService extends TodosService {
  static testTodos: Todos[] = [
    {
      _id: '58895985a22c04e761776d54',
      owner: 'Blanche',
      status: 'incomplete',
      body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.',
      category: 'software design'
    },
    {
      _id: '58895985c1849992336c219b',
      owner: 'Fry',
      status: 'incomplete',
      body: 'Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.',
      category: 'video games'
    },
    {
      _id: '58895985ae3b752b124e7663',
      owner: 'Fry',
      status: 'complete',
      body: 'Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.',
      category: 'homework'
    }
  ];

  constructor() {
    super(null);
  }

  getTodos(filters: { status?: TodosStatus }): Observable<Todos[]> {
    // Our goal here isn't to test (and thus rewrite) the service, so we'll
    // keep it simple and just return the test todos regardless of what
    // filters are passed in.
    return of(MockTodosService.testTodos);
  }

  getTodosById(id: string): Observable<Todos> {
    // If the specified ID is for the first test todo,
    // return that todo, otherwise return `null` so
    // we can test illegal todo requests.
    if (id === MockTodosService.testTodos[0]._id) {
      return of(MockTodosService.testTodos[0]);
    } else if (id === MockTodosService.testTodos[1]._id) {
      return of(MockTodosService.testTodos[1]);
    } else if (id === MockTodosService.testTodos[2]._id) {
      return of(MockTodosService.testTodos[2]);
    }else {
      return of(null);
    }
  }
}
