import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Todos } from './todos';
import { TodosService } from './todos.service';
import { getMatTooltipInvalidPositionError } from '@angular/material/tooltip';

describe('TodosService', () => {

  let todosService: TodosService;
  // Three todos
  const testTodos: Todos[] = [
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

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    todosService = new TodosService(httpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(todosService).toBeTruthy();
  });

  describe('getTodos()', () => {

    it('calls "api/todos" when "getTodos()" is called with no parameters', () => {
      todosService.getTodos().subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      const req = httpTestingController.expectOne(todosService.todosUrl);
      expect(req.request.method).toEqual('GET');
      expect(req.request.params.keys().length).toBe(0);
    });

    describe('Calling getTodos() with parameters correctly forms with HTTP request', () => {

      it('correctly calls api/user with filter parameters \'complete\'', () => {
        todosService.getTodos({ status: 'complete' }).subscribe(
          todos => expect(todos).toBe(testTodos)
        );

        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todosService.todosUrl) && request.params.has('status')
        );

        expect(req.request.method).toEqual('GET');

        expect(req.request.params.get('status')).toEqual('complete');

        req.flush(testTodos);
      });

      it('correctly calls api/user with multiple filter parameters', () => {

        todosService.getTodos({ status: 'complete' }).subscribe(
          todos => expect(todos).toBe(testTodos)
        );

        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todosService.todosUrl)
          && request.params.has('status')
        );

        expect(req.request.method).toEqual('GET');

        expect(req.request.params.get('status')).toEqual('complete');

        req.flush(testTodos);
      });
    });
  });

  describe('getTodosById()', () => {
    it('calls api/todos/id with the correct ID', () => {
      const targetTodo: Todos = testTodos[2];
      const targetId: string = targetTodo._id;

      todosService.getTodosById(targetId).subscribe(
        todos => expect(todos).toBe(targetTodo)
      );

      const expectedUrl: string = todosService.todosUrl + '/' + targetId;
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(targetTodo);
    });
  });

  describe('filterTodos()', () => {

    it('filters by owner', () => {
      //This filters the todos for all owners with "fr" in their name
      const ownerName = 'Fry';
      const filteredTodos = todosService.filterTodos(testTodos, { owner: ownerName });

      expect(filteredTodos.length).toBe(2);

      filteredTodos.forEach(todo => {
        expect(todo.owner.indexOf(ownerName)).toBeGreaterThanOrEqual(0);
      });
    });

    it('filters by category', () => {
      const todoCategory = 'homework';
      const filteredTodos = todosService.filterTodos(testTodos, { category: todoCategory });

      expect(filteredTodos.length).toBe(1);

      filteredTodos.forEach(todo => {
        expect(todo.category.indexOf(todoCategory)).toBeGreaterThanOrEqual(0);
      });
    });

    it('filters by body', () => {
      const todoBody = 'magna';
      const filteredTodos = todosService.filterTodos(testTodos, { body: todoBody });

      expect(filteredTodos.length).toBe(2);

      filteredTodos.forEach(todo => {
        expect(todo.body.indexOf(todoBody)).toBeGreaterThanOrEqual(0);
      });
    });

    it('filters by both owner and category', () => {
      const todoOwner = 'Fry';
      const todoCategory = 'homework';
      const filteredTodos = todosService.filterTodos(testTodos, { owner: todoOwner, category: todoCategory });

      expect(filteredTodos.length).toBe(1);

      filteredTodos.forEach(todo => {
        expect(todo.owner.indexOf(todoOwner)).toBeGreaterThanOrEqual(0);
        expect(todo.category.indexOf(todoCategory)).toBeGreaterThanOrEqual(0);
      });
    });

    it('returns 0 todos when no todos contain the multiple filters given', () => {
      const todoOwner = 'Fry';
      const todoCategory = 'study';
      const filteredTodos = todosService.filterTodos(testTodos, { owner: todoOwner, category: todoCategory});

      expect(filteredTodos.length).toBe(0);
    });
  });
});
