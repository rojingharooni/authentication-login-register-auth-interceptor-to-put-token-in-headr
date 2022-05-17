import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { httpService } from '../http.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup|any;
  registerModel: RegisterModel | any;
  IsPassRepeat = false;
  isSuccessfull = false;

  isWrong= false;


  constructor(private fb: FormBuilder, private http:httpService,private auth : AuthService,private router:Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group
      ({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),




      },
        {
          validator: ConfirmedValidator('password', 'confirmPassword')
        }
      )
  }







  get f() {
    return this.form.controls;
  }

   onSubmit() {

    var firstName = this.form.controls['firstName'].value;
    var lastName = this.form.controls['lastName'].value;
    var email = this.form.controls['email'].value;
    var password = this.form.controls['password'].value;
    var confirmPassword = this.form.controls['confirmPassword'].value;

this.registerModel={firstName:firstName, lastName:lastName, email:email, password:password, confirmPassword:confirmPassword}
console.log(this.registerModel);

 this.auth.register(this.registerModel).subscribe(
  p => {    console.log(p) ,this.isSuccessfull = p,
     this.status(p)}
);




  }

  status(a: any) {
    this.isSuccessfull = a;
    console.log('is sucess from status' + this.isSuccessfull);

    if (this.isSuccessfull == true) {
      this.isWrong = false;
      wait(2000);
       this.router.navigate(['/login']);
    }
    else this.isWrong = true;


}


}



export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
function wait(ms: number){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}



export class RegisterModel{

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  }
