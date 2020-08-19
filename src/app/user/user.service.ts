import {User} from './user.modal';
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersChanged = new EventEmitter<User[]>();

  private companies: string[] = ['Trishala', 'Shanti', 'F-31'];
  loggedInUser: User;
  accessToken: string;

  constructor(private http: HttpClient) {

  }

  getCompanies() {
    return this.companies.slice();
  }

  getUsers() {
    let url:any = 'http://localhost:5000/users';
    return this.http.get(url)
      .pipe(map( response => {
        console.log(response);
        return response;
      }));
  }

  getUser(id: number) {
    let url: string = 'http://localhost:5000/users/' + id;
    return this.http.get(url);
  }

  addUser(user: User) {
    let url: string = 'http://localhost:5000/users';
    return this.http.post(url, user);
  }

  updateUser(userId: number, user: User) {
    let url: string = `http://localhost:5000/users/${userId}`;
    return this.http.put(url, user);
  }

  deleteUser(userId: number) {
    let url: string = `http://localhost:5000/users/${userId}`;
    return this.http.delete(url);
  }

  login(params: any) {
    let url: string = 'http://localhost:5000/login';
    return this.http.post(url, params);
  }
}
