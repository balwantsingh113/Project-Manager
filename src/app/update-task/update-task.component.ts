import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { UserService } from '../user.service';
import { Project } from '../project.model';
import { User } from '../user.model';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  constructor(private taskservice: TaskService, private projectservice: ProjectService, private userservice: UserService, private route: ActivatedRoute, private router: Router) { }


  endTaskStatus: boolean;
  id: number;
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
    this.endTaskStatus = false;
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });

    this.taskservice.getTask(this.id).subscribe(task => {this.task = task; });
    this.projectservice.viewProject().subscribe(projectItems => {this.projectItems = projectItems; });
    this.userservice.viewUser().subscribe(userItems => {this.userItems = userItems; });
    this.taskservice.viewTask().subscribe(taskItems => {this.taskItems = taskItems; });
  }

updateTask(task: Task) {
    this.endTaskStatus = false;
    this.taskservice.updateTask(task).subscribe(data => {if (data) {
      this.task = data;
      this.router.navigateByUrl('/app-view-task');
      }
    });
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
