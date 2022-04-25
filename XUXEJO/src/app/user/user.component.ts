import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users$!: Observable<User[]>;
  userId!: Pick<User, 'id'>;
  userRole!: string;
  isAdmin: boolean = false;

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.fetchAll();
    this.userId = this.userService.id;
    this.userRole = this.userService.role;
    if(this.userRole == 'ADMIN') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  fetchAll(): Observable<User[]> {
    return this.userService.getUsers();
  }

  delete(id: Pick<User, 'id'>): void {
    this.userService.deleteUser(id).subscribe(() => (this.users$ = this.fetchAll()));
  }
}
