import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskService } from 'src/app/shared/services/task.service.api';
import * as boardActions from './board.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Task } from 'src/app/shared/models/task';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class BoardEffects {
  public decodedToken: any;
  constructor(private actions$: Actions, private taskService: TaskService) {
    const helper = new JwtHelperService();
    const getToken = localStorage.getItem('access_token');
    this.decodedToken = helper.decodeToken(getToken);
  }

  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType(boardActions.BoardActionTypes.LoadTasks),
    mergeMap((action: boardActions.LoadTasks) =>
      this.taskService
        .getTasks(this.decodedToken._id)
        .pipe(map((tasks: Task[]) => new boardActions.LoadTasksSuccess(tasks)))
    )
  );

  @Effect()
  updateTask$: Observable<Action> = this.actions$.pipe(
    ofType(boardActions.BoardActionTypes.UpdateTask),
    map((action: boardActions.UpdateTask) => {
      return action.payload;
    }),
    mergeMap((task: Task) =>
      this.taskService.updateTask(task).pipe(
        map(updatedTask => new boardActions.UpdateTaskSuccess(updatedTask)),
        catchError(err => of(new boardActions.UpdateTaskFail(err)))
      )
    )
  );

  @Effect()
  deleteTask$: Observable<Action> = this.actions$.pipe(
    ofType(boardActions.BoardActionTypes.DeleteTask),
    map((action: boardActions.DeleteTask) => action.payload),
    mergeMap((taskId: string) =>
      this.taskService.deleteTask(taskId).pipe(
        map(() => new boardActions.DeleteTaskSuccess(taskId)),
        catchError(err => of(new boardActions.DeleteColumnFail(err)))
      )
    )
  );

  @Effect()
  addTask$: Observable<Action> = this.actions$.pipe(
    ofType(boardActions.BoardActionTypes.AddTask),
    map((action: boardActions.AddTask) => action.payload),
    mergeMap((task: Task) =>
      this.taskService.createTask(task).pipe(
        map(newTask => new boardActions.AddTaskSuccess(newTask)),
        catchError(err => of(new boardActions.AddTaskFail(err)))
      )
    )
  );
}
