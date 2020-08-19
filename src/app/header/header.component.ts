import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Inject the user service and other services to work with user data.
  constructor(public userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
  }

  onClickLogin() {
    // 1. Go to login page
    this.router.navigate(['/login']);
  };

  onClickLogout() {
    // 1. Do logout and Go to login page
    this.userService.loggedInUser = null;
    this.router.navigate(['/login']);
  };
}
