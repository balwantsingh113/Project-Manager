import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User;
  userItems: any[];
  update: boolean;
  constructor(private userservice: UserService) { }

  ngOnInit() {
    this.userservice.viewUser().subscribe(userItems => {this.userItems = userItems; });
    this.update = false;
    this.user = new User();
  }

  enableUpdate(user: User) {
    this.user = user;
    this.update = true;
  }

  addUser(user: User): void  {
    console.log(JSON.stringify(user));
    this.userservice.addUser(user).subscribe(data => { if (data) {
      this.ngOnInit();
 }
    });
  }

  updateUser(user: User): void  {
    this.userservice.updateUser(user).subscribe(data => { if (data) {
      this.ngOnInit();
 }
    });
  }

  deleteUser(user: User): void  {
    this.userservice.deleteUser(user.userId).subscribe(data => { 
      this.ngOnInit();
    });
  }

}
