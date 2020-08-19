import { Component, OnInit } from '@angular/core';
import { User } from '../user.modal';
import { UserService } from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  usersResponse: any[];

  // Inject the user service and other services to work with user data.
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getUsers();
    this.userService.usersChanged.subscribe(([]) => {
      this.getUsers();
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response;
    });
  };

  onNewUser() {
    this.router.navigate(['new'], {relativeTo: this.route});
  };

}
