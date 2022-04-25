import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = "Szabo Pizza";
  isAuthenticated = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    })
  }

  logout() {
    localStorage.getItem("token");
    this.userService.isUserLoggedIn$.next(false);
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
  }
}
