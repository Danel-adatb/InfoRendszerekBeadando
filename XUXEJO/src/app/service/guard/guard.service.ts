import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): Observable<boolean> {
    if(!this.userService.isUserLoggedIn$.value) {
      this.router.navigateByUrl('/register');
    }
    return this.userService.isUserLoggedIn$;
  }
}
