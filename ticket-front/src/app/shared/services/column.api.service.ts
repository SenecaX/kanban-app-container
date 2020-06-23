import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Column } from '../models/column';

@Injectable({ providedIn: 'root' })
export class ColumnService {
  constructor(private readonly http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getColumns(userId: string) {
    return this.http.get('http://localhost:3001/api/column/' + userId);
  }

  createColumn(column: Column) {
    return this.http.post('http://localhost:3001/api/column/', column).pipe(
      tap((data: Column) => data),
      catchError(this.errorHandler)
    );
  }

  deleteColumn(columnId: string): Observable<Column> {
    this.httpOptions.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE'
    );

    return this.http
      .delete<Column>(
        'http://localhost:3001/api/column/' + columnId,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
