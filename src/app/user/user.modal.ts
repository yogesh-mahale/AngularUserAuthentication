export class User {
  public id?: number;
  public username: string;
  public address: string;
  public mobile: string;
  public email: string;
  public password: string;
  public companies: string;
  public isAdmin?: number;


  constructor(username: string, email: string, address: string, mobile: string, password: string, companies: string) {
    // Can use typescript shortcut variable declaration feature here. but still assign to vars.
    this.username = username;
    this.email = email;
    this.address = address;
    this.mobile = mobile;
    this.password = password;
    this.companies = companies;
  }
}
