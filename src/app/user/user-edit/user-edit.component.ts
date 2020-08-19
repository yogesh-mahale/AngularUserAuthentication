import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../user.service';
import {User} from '../user.modal';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  // User edit form details holds here.
  @ViewChild('f') userEditForm: NgForm;

  companies: string[]; // Holds the list of companies
  editMode = false; // Determine that user form is for edit or create
  id: number; // selected user id
  user: User; // Holds the current selected user

  private subscription: Subscription; // Holds the observable instance

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // 1. Get companies
    this.companies = this.userService.getCompanies();

    // 2. Get selected user details
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; // Type cast string to integer

      if (this.id) {
        this.userService.getUser(this.id).subscribe((user: User) => {
          if (user) {
            this.editMode = true;
            this.userEditForm.setValue({
              username: user.username,
              email: user.email,
              password: user.password,
              mobile: user.mobile,
              address: user.address,
              companies: user.companies,
            });
          } else {
            this.editMode = false;
          }
        });
      }
    });
  }

  onSubmit(form: NgForm) {
    const formData = form.value;

    // 1. If Edit Mode On then Edit the User
    if (this.editMode) {
      const editUser = new User(
        formData.username,
        formData.email,
        formData.address,
        formData.mobile,
        formData.password,
        JSON.stringify(formData.companies)
      );

      // 1.1 Call userService to edit user
      this.userService.updateUser(this.id, editUser).subscribe((response) => {
        console.log(response);
        this.userService.usersChanged.emit([]);
        this.editMode = false;
        form.reset();
      });
    } else {
      // 2. If edit mode false then Create new user
      const newUser = new User(
        formData.username,
        formData.email,
        formData.address,
        formData.mobile,
        formData.password,
        JSON.stringify(formData.companies)
      );

      // 2.1 Call userService to add user
      this.userService.addUser(newUser).subscribe((response) => {
        console.log(response);
        this.userService.usersChanged.emit([]);
        this.editMode = false;
        form.reset();
      });
    }
  }

  ngOnDestroy() {
    // 1. Unsubsribe the subscription to avoid the memory leak.
    this.subscription.unsubscribe();
  }

}
