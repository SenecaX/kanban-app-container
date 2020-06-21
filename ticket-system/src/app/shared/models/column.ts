import { Task } from './task';

export class Column {
  _id?: string;
  columnName: string;
  userId: string;
  tasks: Task[];
}
