
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { TodosProfileComponent } from './todos-profile.component';
import { Todos } from './todos';
import { TodosListComponent } from './todos-list.component';
import { TodosService } from './todos.service';
import { MockTodosService } from 'src/testing/todos.service.mock';

describe('TodosProfileComponent', () => {
  let component: TodosProfileComponent;
  let fixture: ComponentFixture<TodosProfileComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule
      ],
      declarations: [ TodosProfileComponent, TodosListComponent],
      providers: [
        { provide: TodosService, useValue: new MockTodosService() },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/**
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
