import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private taskservice: TaskService, private projectservice: ProjectService ) { }
  taskItems: any[];
  taskName: string;
  parentTask: string;
  priority: number;
  startDate: Date;
  endDate: Date;
  projectItems: any[];
  projectName: string;
  task: Task;

  ngOnInit() {
    this.taskservice.viewTask().subscribe(taskItems => {this.taskItems = taskItems; });
    this.projectservice.viewProject().subscribe(projectItems => {this.projectItems = projectItems; });
    
  }

  setproject(project: Project) {
    this.projectName = project.projectName;
  }

  updateEndStatus(task: Task)  {
    this.taskservice.updateEndStatus(task).subscribe(data => {
      if (data) {
        this.ngOnInit();
      }
    });
  }

}
