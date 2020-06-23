import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskService } from 'src/app/shared/services/task.service.api';
import * as boardActions from './board.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Task } from 'src/app/shared/models/task';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Column } from 'src/app/shared/models/column';
import { ColumnService } from 'src/app/shared/services/column.api.service';

@Injectable()
export class BoardEffects {
  public decodedToken: any;

  constructor(
    private readonly actions$: Actions,
    private readonly taskService: TaskService,
    private readonly columnService: ColumnService
  ) {
    const helper = new JwtHelperService();
    const getToken = localStorage.getItem('access_token');
    this.decodedToken = helper.decodeToken(getToken);
  }

  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType(boardActions.BoardActionTypes.LoadTasks),
    mergeMap((action: boardActions.LoadTasks) =>
      this.taskService.getTasks(this.decodedToken._id).pipe(
        map((tasks: Task[]) => {
          return new boardActions.LoadTasksSuccess(tasks);
        })
      )
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

  @Effect()
  addColumn$: Observable<Action> = this.actions$.pipe(
    ofType(boardActions.BoardActionTypes.AddColumn),
    map((action: boardActions.AddColumn) => action.payload),
    mergeMap((column: Column) =>
      this.columnService.createColumn(column).pipe(
        map(newColumn => new boardActions.AddColumnSuccess(newColumn)),
        catchError(err => of(new boardActions.AddColumnFail(err)))
      )
    )
  );

  @Effect()
  loadColumns$ = this.actions$.pipe(
    ofType(boardActions.BoardActionTypes.LoadColumns),
    mergeMap((action: boardActions.LoadColumns) => {
      console.log('load');
      return this.columnService
        .getColumns(this.decodedToken._id)
        .pipe(
          map(
            (columns: Column[]) => new boardActions.LoadColumnsSuccess(columns)
          )
        );
    })
  );

  @Effect()
  deleteColumn$: Observable<Action> = this.actions$.pipe(
    ofType(boardActions.BoardActionTypes.DeleteColumn),
    map((action: boardActions.DeleteColumn) => action.payload),
    mergeMap((columnId: string) => {
      return this.columnService.deleteColumn(columnId).pipe(
        map(() => new boardActions.DeleteColumnSuccess(columnId)),
        catchError(err => of(new boardActions.DeleteColumnFail(err)))
      );
    })
  );
}
