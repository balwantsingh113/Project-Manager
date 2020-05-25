import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './task.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient ) { }

  private apiUrl = 'http://localhost:8085/task-service/v1';

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }

  // Adding new task
  addTask(task: Task): Observable<Task> {
    console.log('Sending data is' + JSON.stringify(task));
    return this.http.post<Task>(this.apiUrl + '/addtask', task ).pipe( map(() => task), catchError(this.handleError));
  }

  // Updating task
  updateTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl + '/updatetask', task).pipe(
      map(() => task),
      catchError(this.handleError)
    );
  }

 // Read all REST Items
 viewTask(): Observable<Task[]> {
  return this.http.get<Task[]>(this.apiUrl + '/tasks').pipe(map(data => data));
  }

  // Get a task based on task id
  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(this.apiUrl + '/task/' + id).pipe(map(data => data));
    }

    // Uppdating end status for task
  updateEndStatus(task: Task): Observable<Task>  {
    return this.http.post<Task>(this.apiUrl + '/updateendstatus', task).pipe(
      map(() => task),
      catchError(this.handleError)
    );
  }
}
