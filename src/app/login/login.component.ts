import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { httpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup | any;
  Model: loginModel | any;
  IsPassRepeat = false;
  isSuccessfull = false;
  isWrong = false;
  userName: any;
  userRole:any;
  @Output() userInfo: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private http: httpService
  ) {}

  ngOnInit(): void {
    this.isSuccessfull = this.auth.isSuccessfull;

    this.form = this.fb.group(
      {
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      },
      {}
    );
    this.userInfo.emit('hi');

  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    //   var x :any={ bankname:'banknn'}
    //   this.http.post<any>('http://185.213.11.91/api/Type/BankNames', x ).subscribe(p =>
    //     console.log('post b ank names'+p)
    //     , error => {
    //       console.log('error is:' + JSON.stringify(error));
    //     }
    // );

    var email = this.form.controls['email'].value;
    var password = this.form.controls['password'].value;

    this.Model = { email: email, password: password };
    this.auth.login(this.Model);


    if (this.isSuccessfull == true) {
      console.log('is suvccesfull from login:' + this.isSuccessfull);
      this.isWrong = false;
      this.userName = this.auth.userName;
      this.userRole = this.auth.userRole;
      console.log('decoded nameid from login:' + this.userName);
    } else this.isWrong = true;

    this.userInfo.emit('hi');

  }


  status() {
    console.log('decoded nameid from login:' + this.userName);

  }

}


  export class loginModel{

    email: string = '';
    password: string = '';
    }
