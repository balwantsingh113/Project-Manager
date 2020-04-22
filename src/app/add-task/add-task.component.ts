import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { User } from '../user.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private taskservice: TaskService, private userservice: UserService, private projectservice: ProjectService) { }

  task: Task;
  project: Project;
  user: User;
  taskaddstatus = false;
  ifParent = false;
  taskItems: any[];
  projectItems: any[];
  search: string;
  userItems: any[];
  isDisabled = false;
  isValidDate: boolean;
  error: any;


  ngOnInit() {
    this.task = new Task();
    this.project = new Project();
    this.user = new User();
    this.error = {isError: false, errorMessage: ''};

    this.userservice.viewUser().subscribe(userItems => {this.userItems = userItems; });
    this.projectservice.viewProject().subscribe(projectItems => {this.projectItems = projectItems; });
    this.taskservice.viewTask().subscribe(taskItems => {this.taskItems = taskItems; });
  }

  addTask(task: Task): void  {
    this.isValidDate = this.validateDates(this.task.startDate, this.task.endDate);
    if (this.isValidDate) {
      this.taskservice.addTask(task).subscribe(data => { if (data) {
        this.taskaddstatus = true;
      }
    });
  }
 }

  validateDates(sDate: Date, eDate: Date) {
    this.isValidDate = true;
    if ((sDate == null || eDate == null)) {
      this.error = {isError: true, errorMessage: 'Start date and end date are required.'};
      this.isValidDate = false;
    }
  
    if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
      this.error = {isError: true, errorMessage: 'End date should be greater then start date.'};
      this.isValidDate = false;
    }
    return this.isValidDate;
  }

  setProject(project: Project) {
    this.task.projectName = project.projectName;
    this.task.projectId = project.projectId;
  }

  setTask(taskName: string) {
    this.task.parentTask = taskName;
  }

  setUser(firstName: string) {
    this.task.userName = firstName;
  }

  disablefields()
  {
    this.isDisabled = !this.isDisabled;
    return;
  }

}
