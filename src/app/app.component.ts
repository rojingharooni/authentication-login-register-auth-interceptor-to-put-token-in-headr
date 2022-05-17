import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'authentication';

  username: string = 'b';
  isLogin = false;
  constructor(public auth : AuthService , private router:Router) { }

  ngOnInit(): void {
console.log('user from nav '+this.auth.user);
  }


  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
    location.reload();


  }

  login() {
    console.log('login');
  }
}
