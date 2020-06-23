import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { JwtHelperService } from '@auth0/angular-jwt';
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
import lodash from 'lodash';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/** This component is used to display the board, columns and tasks
 *  of a particular user. The user will be able to perform tasks such
 *  as adding a column, deleting a column, adding, deleting, modifying
 *  and viewing the different tasks available.
 */
export class DashboardComponent implements OnInit {
  private decodedToken: any;
  private clonedColumn: Column[];

  public tasks: Task[] | any;
  public columns: Task[] | any;
  public draggedTask: any;
  public editTaskName: boolean;
  public board: any;
  public addTaskName: boolean;
  public saveEdit: boolean;
  public currentAddIndex: number;
  public currentEditTaskId: string;
  public changeName: string;
  public errorMsg: string;
  public display: boolean;

  // icons
  public faTimes = faTimes;
  public faEdit = faEdit;
  public faPlus = faPlus;
  public faCheck = faCheck;
  public faDumpster = faDumpster;

  constructor(
    private readonly store: Store<fromBoard.State>,
    private alertService: AlertService
  ) {
    // helper function used to decode and extract data out of token
    const helper = new JwtHelperService();
    const getToken = localStorage.getItem('access_token');

    // initializing all the variables that will be used here
    this.decodedToken = helper.decodeToken(getToken);
    this.display = false;
    this.currentAddIndex = -1;
    this.editTaskName = false;
    this.addTaskName = false;
    this.columns = [];
    this.currentEditTaskId = null;
    this.changeName = '';
    this.errorMsg = '';
    this.board = {
      columns: []
    };
  }

  ngOnInit() {
    // Getting columns and tasks from store
    this.getColumns();
  }

  // DragAndDrog function used to register change of columns for tasks
  drop(event: CdkDragDrop<string[]>, columnIndex, nextColumn) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const task: Task = { ...event.item.data };
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      task.columnId = nextColumn._id;
      // when swapping a task from one column to another, update the database and store.
      this.store.dispatch(new boardActions.UpdateTask(task));
    }
  }

  // method for adding a new task
  public addTask(i): void {
    this.currentAddIndex = i;
    this.addTaskName = true;
  }

  // method for cancelling an addition of task
  public cancelAdd(): void {
    this.addTaskName = false;
    this.getColumns();
  }

  // method to add a new column
  public addNewColumn(columnName) {
    const column: Column = {
      columnName: columnName.value,
      userId: this.decodedToken._id
    };
    this.alertService.success('saved successfully');

    // saving new column and adding it to the store
    this.store.dispatch(new boardActions.AddColumn(column));
  }

  // method used to save a new task
  public saveTask(item, columnId): void {
    const task: Task = {
      columnId,
      taskName: item,
      userId: this.decodedToken._id
    };

    // save the new task to store and mongoDB
    this.store.dispatch(new boardActions.AddTask(task));
    this.addTaskName = false;
    this.currentAddIndex = -1;
  }

  // method used to get tasks from store and load on screen
  public getTask(clonedColumn): void {
    this.store.dispatch(new boardActions.LoadTasks());

    if (clonedColumn !== null) {
      this.board.columns = [];
      // filtering column to add tasks to their respective columns
      clonedColumn.filter((column, index) => {
        this.board.columns.push(column);
        this.store.pipe(select(fromBoard.getTask)).subscribe(tasks => {
          if (this.board.columns[index] && tasks) {
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

    // after populating columns and tasks, change display to true to display html
    this.display = true;
  }

  // method used to get columns from the store
  public getColumns() {
    this.store.dispatch(new boardActions.LoadColumns());
    this.store.pipe(select(fromBoard.getColumn)).subscribe(columns => {
      // cloning the column to manipulate the data
      this.clonedColumn = lodash.cloneDeep(columns);
      this.getTask(this.clonedColumn);
    });
  }

  public deleteColumn(columnId): void {
    this.store.dispatch(new boardActions.DeleteColumn(columnId));
  }

  // cancel editing of tasks and display columns and tasks
  public cancelTask(): void {
    this.getColumns();
    this.editTaskName = false;
  }

  // method used to edit tasks and save changes to db + update store
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

  // method used to delete a task from the store and db
  public deleteTask(task): void {
    this.store.dispatch(new boardActions.DeleteTask(task._id));
  }
}
