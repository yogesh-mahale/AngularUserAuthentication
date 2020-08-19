import { Component, OnInit } from '@angular/core';
import {User} from '../user/user.modal';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User; // Holds the user reference
  id: number; // Holds the current loggedin user id
  company: string; // Holds the current selected company name

  // Default user image
  defaultUserImg: any = 'data:image/jpeg;base64,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';

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    // 1. If user is loggedin then only access the company dashboard page. Else redirect to Login page.
    if (this.userService.loggedInUser) {
      this.route.queryParams.subscribe(params => {
        this.company = params['company'];
        this.id = params['userId'];

        // 2. Fetch current user logged in details
        this.getUser();
      });
    } else {
      // 3. Redirect to login page
      this.router.navigate(['/login']);
    }
  }

  getUser() {
    // 1. Get user from backend
    this.userService.getUser(this.id).subscribe((user: User) => {
      this.user = user;
    });
  }


}
