import { Column } from 'src/app/shared/models/column';
import { Action } from '@ngrx/store';
import { Task } from 'src/app/shared/models/task';

export enum BoardActionTypes {
  LoadColumns = '[Columns] Load Columns',
  LoadColumnsSuccess = '[Columns] Load Columns Success',
  LoadColumnsFail = '[Columns] Load Columns Fail',
  AddColumn = '[Column] Add Column',
  AddColumnSuccess = '[Column] Add Column Success',
  AddColumnFail = '[Column] Add Column Fail',
  DeleteColumn = '[Column] Delete Column',
  DeleteColumnSuccess = '[Column] Delete Column Success',
  DeleteColumnFail = '[Column] Delete Column Fail',
  SetCurrentTask = '[Task] Set Current Task',
  ClearCurrentTask = '[Task] Clear Current Task',
  InitializeCurrentTask = '[Task] Initialize Current Task',
  LoadTasks = '[Task] Load Task',
  LoadTasksSuccess = '[Task] Load Task Success',
  LoadTasksFail = '[Task] Load Task Fail',
  AddTask = '[Task] Add Task',
  AddTaskSuccess = '[Task] Add Task Success',
  AddTaskFail = '[Task] Add Task Fail',
  UpdateTask = '[Task] Update Task',
  UpdateTaskSuccess = '[Task] Update Task Success',
  UpdateTaskFail = '[Task] Update Task Fail',
  DeleteTask = '[Task] Delete Task',
  DeleteTaskSuccess = '[Task] Delete Task Success',
  DeleteTaskFail = '[Task] Delete Task Fail'
}

export class LoadColumns implements Action {
  readonly type = BoardActionTypes.LoadColumns;
}

export class LoadColumnsSuccess implements Action {
  readonly type = BoardActionTypes.LoadColumnsSuccess;

  constructor(public payload: Column[]) {}
}

export class LoadColumnsFail implements Action {
  readonly type = BoardActionTypes.LoadColumnsFail;

  constructor(public payload: string) {}
}

export class AddColumn implements Action {
  readonly type = BoardActionTypes.AddColumn;
}

export class AddColumnSuccess implements Action {
  readonly type = BoardActionTypes.AddColumnSuccess;

  constructor(public payload: Column) {}
}

export class AddColumnFail implements Action {
  readonly type = BoardActionTypes.AddColumnFail;

  constructor(public payload: string) {}
}

export class DeleteColumn implements Action {
  readonly type = BoardActionTypes.DeleteColumn;
}

export class DeleteColumnSuccess implements Action {
  readonly type = BoardActionTypes.DeleteColumnSuccess;

  constructor(public payload: Column) {}
}

export class DeleteColumnFail implements Action {
  readonly type = BoardActionTypes.DeleteColumnFail;

  constructor(public payload: string) {}
}

export class SetCurrentTask implements Action {
  readonly type = BoardActionTypes.SetCurrentTask;

  constructor(public payload: Task) {}
}

export class ClearCurrentTask implements Action {
  readonly type = BoardActionTypes.ClearCurrentTask;
}

export class InitializeCurrentTask implements Action {
  readonly type = BoardActionTypes.InitializeCurrentTask;
}

export class LoadTasks implements Action {
  readonly type = BoardActionTypes.LoadTasks;
}

export class LoadTasksSuccess implements Action {
  readonly type = BoardActionTypes.LoadTasksSuccess;

  constructor(public payload: Task[]) {}
}

export class LoadTasksFail implements Action {
  readonly type = BoardActionTypes.LoadTasksFail;

  constructor(public payload: string) {}
}

export class AddTask implements Action {
  readonly type = BoardActionTypes.AddTask;

  constructor(public payload: Task) {}
}

export class AddTaskSuccess implements Action {
  readonly type = BoardActionTypes.AddTaskSuccess;

  constructor(public payload: Task) {}
}

export class AddTaskFail implements Action {
  readonly type = BoardActionTypes.AddTaskFail;

  constructor(public payload: string) {}
}

export class UpdateTask implements Action {
  readonly type = BoardActionTypes.UpdateTask;

  constructor(public payload: Task) {}
}

export class UpdateTaskSuccess implements Action {
  readonly type = BoardActionTypes.UpdateTaskSuccess;

  constructor(public payload: Task) {}
}

export class UpdateTaskFail implements Action {
  readonly type = BoardActionTypes.UpdateTaskFail;

  constructor(public payload: string) {}
}

export class DeleteTask implements Action {
  readonly type = BoardActionTypes.DeleteTask;

  constructor(public payload: string) {}
}

export class DeleteTaskSuccess implements Action {
  readonly type = BoardActionTypes.DeleteTaskSuccess;

  constructor(public payload: string) {}
}

export class DeleteTaskFail implements Action {
  readonly type = BoardActionTypes.DeleteTaskFail;

  constructor(public payload: string) {}
}

export type BoardActions =
  | LoadColumns
  | LoadColumnsSuccess
  | LoadColumnsFail
  | DeleteColumn
  | DeleteColumnSuccess
  | DeleteColumnFail
  | LoadTasks
  | LoadTasksSuccess
  | LoadTasksFail
  | SetCurrentTask
  | ClearCurrentTask
  | InitializeCurrentTask
  | AddTask
  | AddTaskSuccess
  | AddTaskFail
  | UpdateTask
  | UpdateTaskSuccess
  | UpdateTaskFail
  | DeleteTask
  | DeleteTaskSuccess
  | DeleteTaskFail;
