import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/shared/services/task.service.api';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Board } from 'src/app/shared/models/board';
import { Column } from 'src/app/shared/models/column';
import {
  faTimes,
  faEdit,
  faPlus,
  faCheck,
  faDumpster
} from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/shared/models/task';
import { Store, select } from '@ngrx/store';
import * as boardActions from '../state/board.actions';
import * as fromBoard from '../state/board.reducer';
import { ColumnService } from 'src/app/shared/services/column.api.service';
import lodash from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public decodedToken: any;
  public board: any;
  public tasks: Task[] | any;
  public columns: Task[] | any;
  public draggedTask: any;
  public editTaskName: boolean;
  public addTaskName: boolean;
  public saveEdit: boolean;
  public containerEmpty: boolean;

  public currentAddIndex = -1;
  public currentEditTaskId = null;
  public changeName = '';
  public errorMsg = '';
  public display: boolean;
  public clonedColumn: Column[];

  // icons
  public faTimes = faTimes;
  public faEdit = faEdit;
  public faPlus = faPlus;
  public faCheck = faCheck;
  public faDumpster = faDumpster;

  constructor(private store: Store<fromBoard.State>) {
    const helper = new JwtHelperService();
    const getToken = localStorage.getItem('access_token');
    this.decodedToken = helper.decodeToken(getToken);

    this.display = false;

    this.editTaskName = false;
    this.addTaskName = false;
    this.columns = [];
    this.board = {
      columns: []
    };
  }

  ngOnInit() {
    this.getColumns();

    console.log('this', this);
  }

  drop(event: CdkDragDrop<string[]>, columnIndex, nextColumn) {
    if (event.previousContainer === event.container) {
      const task: Task = { ...event.item.data };
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      task.columnId = columnIndex;
    } else {
      const task1: Task = { ...event.item.data };
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      task1.columnId = nextColumn._id;
      this.store.dispatch(new boardActions.UpdateTask(task1));
    }
  }

  public addTask(i): void {
    this.currentAddIndex = i;
    this.addTaskName = true;
  }

  public cancelAdd(): void {
    this.addTaskName = false;
    this.getColumns();
  }

  public addNewColumn(columnName) {
    const column: Column = {
      columnName: columnName.value,
      userId: this.decodedToken._id
    };

    this.store.dispatch(new boardActions.AddColumn(column));
  }

  public saveTask(item, columnId): void {
    console.log('col', columnId);
    const task: Task = {
      columnId,
      taskName: item,
      userId: this.decodedToken._id
    };

    this.store.dispatch(new boardActions.AddTask(task));
    this.addTaskName = false;
    this.currentAddIndex = -1;
  }

  public getTask(clonedColumn): void {
    this.store.dispatch(new boardActions.LoadTasks());

    if (clonedColumn !== null) {
      this.board.columns = [];
      clonedColumn.filter((column, index) => {
        this.board.columns.push(column);
        this.store.pipe(select(fromBoard.getTask)).subscribe(tasks => {
          if (tasks) {
            this.board.columns[index].tasks = [];
            tasks.filter(task => {
              if (task.columnId === this.board.columns[index]._id) {
                this.board.columns[index].tasks.push(task);
              }
            });
          }
        });
      });
    }
    this.display = true;
  }

  public getColumns() {
    this.store.dispatch(new boardActions.LoadColumns());
    this.store.pipe(select(fromBoard.getColumn)).subscribe(columns => {
      this.clonedColumn = lodash.cloneDeep(columns);
      if (this.clonedColumn) {
        this.getTask(this.clonedColumn);
      }
    });
  }

  public cancelTask(): void {
    this.getColumns();
    this.editTaskName = false;
  }

  public editTask(task: Task, name?: string): void {
    const newTask = { ...task };
    this.changeName = task.taskName;
    this.currentEditTaskId = task._id;
    this.saveEdit = true;
    this.editTaskName = true;
    newTask.taskName = name;

    if (name) {
      this.store.dispatch(new boardActions.UpdateTask(newTask));
      this.editTaskName = false;
      this.saveEdit = false;
    }
  }

  public deleteTask(task): void {
    this.store.dispatch(new boardActions.DeleteTask(task._id));
  }
}
