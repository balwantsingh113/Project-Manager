import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateTaskComponent } from './update-task/update-task.component';


const routes: Routes = [
  { path: '', component: AddUserComponent },
  { path: 'app-add-user', component: AddUserComponent },
  { path: 'app-add-project', component: AddProjectComponent },
  { path: 'app-add-task', component: AddTaskComponent },
  { path: 'app-view-task', component: ViewTaskComponent },
  { path: 'app-update-task', component: UpdateTaskComponent },
  { path: 'app-update-task/:id', component: UpdateTaskComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
