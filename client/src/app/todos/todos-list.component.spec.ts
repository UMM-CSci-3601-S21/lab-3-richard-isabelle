import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { userInfo } from 'os';
import { Observable } from 'rxjs';
import { MockTodosService } from '../../testing/todos.service.mock';
import { Todos } from './todos';
import { TodosListComponent } from './todos-list.component';
import { TodosService } from './todos.service';

const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('TodosListComponent', () => {
  let todosList: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [ TodosListComponent ],
      providers: [{ provide: TodosService, useValue: new MockTodosService() }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListComponent);
    todosList = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(todosList).toBeTruthy();
  });

  it('contains all of the todos', () => {
    expect(todosList.serverFilteredTodos.length).toBe(3);
  });

  it('contains a owner name "Blanche"', () => {
    expect(todosList.serverFilteredTodos.some((todos: Todos) => todos.owner === 'Blanche')).toBe(true);
  });

  it('does not contain a owner named "Sammy"', () => {
    expect(todosList.serverFilteredTodos.some((todos: Todos) => todos.owner === 'Sammy')).toBe(false);
  });

  it('contains two todos that have the owner named "Fry"', () => {
    expect(todosList.serverFilteredTodos.filter((todos: Todos) => todos.owner === 'Fry').length).toBe(2);
  });

  it('contains a todo with a complete status', () => {
    expect(todosList.serverFilteredTodos.filter((todos: Todos) => todos.status === 'complete').length).toBe(1);
  });

  it('contains one todo with the category of "homework"', () => {
    expect(todosList.serverFilteredTodos.filter((todos: Todos) => todos.category === 'homework').length).toBe(1);
  });

  it('contains two todos with bodies that contain the phrase "magna"', () => {
    expect(todosList.serverFilteredTodos.filter((todos: Todos) => todos.body.includes('magna') === true).length).toBe(2);
  });
});
