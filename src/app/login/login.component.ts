import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../user/user.modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedInUser: User = null; // Holds the current logged in user details
  allowedCompanies: any[]; // Holds the list of companies that current user is eligible to enter
  message: string; // Holds the error message on login form

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    // 1. Prepare the params
    const params: {email: string, password: string} = {
      email: form.value.email,
      password: form.value.password
    };

    // 2. Do check authentication. Generate JWT accesstoken
    this.userService.login(params).subscribe((response:any) => {
      // 2.1 If user puts wrong details, then show error message on form
      if (response.error) {
        this.message = response.message;
      } else {
        // 2.3 If user enter valid details then show allowed companies form. So user will click and go to company dashboard.
        this.userService.loggedInUser = response.user;
        this.loggedInUser = this.userService.loggedInUser;
        this.allowedCompanies = JSON.parse(this.loggedInUser.companies);

        // 3. Reset the form
        form.reset();
      }
    });
  }

  logout() {
    // 1. Logout the user. Clear the session
    this.userService.loggedInUser = null;

    // 2. Go to login page.
    this.router.navigate(['/login']);
  }

  onClickCompany(company: string) {
     // Go to company dashboard
     this.router.navigate(['/dashboard'], {queryParams: {'company': company, 'userId': this.loggedInUser.id}});
  };
}
