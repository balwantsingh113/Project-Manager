import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './task.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from './user.model';
import { Project } from './project.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient ) { }

  private apiUrl = 'http://localhost:8085/project-service/v1';

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }

  // Adding new task
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl + '/addproject', project ).pipe( map(() => project), catchError(this.handleError));
  }

  // Updating task
  updateProject(project: Project): Observable<Project> {
    return this.http.post<Task>(this.apiUrl + '/updateproject', project).pipe(
      map(() => project),
      catchError(this.handleError)
    );
  }

 // Read all REST Items
 viewProject(): Observable<Project[]> {
  return this.http.get<Project[]>(this.apiUrl + '/projects').pipe(map(data => data));
  }

  // Get a task based on task id
  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.apiUrl + '/project/' + id).pipe(map(data => data));
    }

      // Uppdating end status for task
  updateEndStatus(project: Project): Observable<Project>  {
    return this.http.put<Project>(this.apiUrl + '/projectstatus', project).pipe(
      map(() => project),
      catchError(this.handleError)
    );
  }

  }
