import * as fromRoot from '../../../state/kanban.state';
import { Task } from 'src/app/shared/models/task';
import { Column } from 'src/app/shared/models/column';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardActions, BoardActionTypes, UpdateTask } from './board.actions';

export interface State extends fromRoot.State {
  board: BoardState;
}

export interface BoardState {
  tasks: Task[];
  column: Column[];
  error: string;
  currentTaskId: string | null;
}

const initialState: BoardState = {
  tasks: null,
  column: null,
  error: '',
  currentTaskId: null
};

const getBoardFeatureState = createFeatureSelector<BoardState>('board');

export const getTask = createSelector(
  getBoardFeatureState,
  state => state.tasks
);

export const getColumn = createSelector(
  getBoardFeatureState,
  state => state.column
);

export const getCurrentTaskId = createSelector(
  getBoardFeatureState,
  state => state.currentTaskId
);

export const getCurrentTask = createSelector(
  getBoardFeatureState,
  getCurrentTaskId,
  (state, currentTaskId) => {
    if (currentTaskId === '') {
      return {
        _id: '0',
        taskName: 'new',
        userId: '',
        status: 0
      };
    } else {
      return currentTaskId
        ? state.tasks.find(p => p._id === currentTaskId)
        : null;
    }
  }
);

export function boardReducer(
  state = initialState,
  action: BoardActions
): BoardState {
  switch (action.type) {
    case BoardActionTypes.LoadTasksSuccess:
      return {
        ...state,
        tasks: action.payload,
        error: ''
      };

    case BoardActionTypes.LoadTasksFail:
      return {
        ...state,
        tasks: [],
        error: action.payload
      };

    case BoardActionTypes.SetCurrentTask:
      return {
        ...state,
        currentTaskId: action.payload._id
      };

    case BoardActionTypes.ClearCurrentTask:
      return {
        ...state,
        currentTaskId: null
      };

    case BoardActionTypes.InitializeCurrentTask:
      return {
        ...state,
        currentTaskId: '0'
      };

    case BoardActionTypes.UpdateTaskSuccess:
      const updatedTask = state.tasks.map(item => {
        return action.payload._id === item._id ? action.payload : item;
      });
      return {
        ...state,
        tasks: updatedTask,
        currentTaskId: action.payload._id,
        error: ''
      };

    case BoardActionTypes.UpdateTaskFail:
      return {
        ...state,
        error: action.payload
      };

    case BoardActionTypes.AddTaskSuccess:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        currentTaskId: action.payload._id,
        error: ''
      };

    case BoardActionTypes.AddTaskFail:
      return {
        ...state,
        error: action.payload
      };

    case BoardActionTypes.DeleteTaskSuccess:
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload),
        currentTaskId: null,
        error: ''
      };

    case BoardActionTypes.DeleteTaskFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
