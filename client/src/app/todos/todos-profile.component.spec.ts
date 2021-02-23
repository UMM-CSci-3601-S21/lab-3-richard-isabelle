import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { TodosProfileComponent } from './todos-profile.component';
import { Todos } from './todos';
import { TodosCardComponent } from './todos-card.component';
import { TodosService } from './todos.service';
import { MockTodosService } from 'src/testing/todos.service.mock';
/*
describe('TodosProfileComponent', () => {
  let todosProfile: TodosProfileComponent;
  let fixture: ComponentFixture<TodosProfileComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule
      ],
      declarations: [TodosProfileComponent, TodosCardComponent],
      providers: [
        { provide: TodosService, useValue: new MockTodosService() },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosProfileComponent);
    todosProfile = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(todosProfile).toBeTruthy();
  });

  it('should navigate to a specific todo page/profile', () => {
    const expectedTodo: Todos = MockTodosService.testTodos[1];

    activatedRoute.setParamMap({ id: expectedTodo._id });

    expect(todosProfile.id).toEqual(expectedTodo._id);
    expect(todosProfile.todo).toEqual(expectedTodo);
  });

  it('should navigate to the correct todo when the id changes', () => {
    let expectedTodo: Todos = MockTodosService.testTodos[0];

    activatedRoute.setParamMap({ id: expectedTodo._id });

    expect(todosProfile.id).toEqual(expectedTodo._id);

    //changing the ID of our todo and making sure that it will still navigate correctly
    expectedTodo = MockTodosService.testTodos[2];
    activatedRoute.setParamMap({ id: expectedTodo._id });

    expect(todosProfile.id).toEqual(expectedTodo._id);
  });

  it('should be "null" if the ID doesn\'t exist', () => {
    activatedRoute.setParamMap({ id: 'invalidID'});

    expect(todosProfile.id).toEqual('invalidID');
    expect(todosProfile.todo).toBeNull();
  });
});
*/
