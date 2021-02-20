import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { MockUserService } from '../../testing/user.service.mock';
import { TodosProfileComponent } from './todos-profile.component';
import { Todos } from './todos';
import { TodosListComponent } from './todos-list.component';
import { TodosService } from './todos.service';

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
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
