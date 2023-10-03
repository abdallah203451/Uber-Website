import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-driver-sign-in',
  templateUrl: './driver-sign-in.component.html',
  styleUrls: ['./driver-sign-in.component.css']
})
export class DriverSignInComponent {
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  phonePattern = '^[0-9]{4}[0-9]{3}[0-9]{4}$';
  plateNumberPattern = '^[0-9]{3} [a-z]{3}$';
  public static h= "";
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    (this.registerForm = new FormGroup({
      username: new FormControl(this.UserRegister.username, [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl(this.UserRegister.email, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(this.UserRegister.phone, [
        Validators.required,
        Validators.pattern(this.phonePattern),
      ]),
      plateNumber: new FormControl(this.UserRegister.plateNumber, [
        Validators.required,
        Validators.pattern(this.plateNumberPattern),
      ]),
      password: new FormControl(this.UserRegister.password, [
        Validators.required,
        Validators.minLength(8),
      ]),
      password1: new FormControl(this.UserRegister.password1, [
        Validators.required,
        Validators.minLength(8),
      ]),
    })),
      (this.loginForm = new FormGroup({
        phone: new FormControl(this.UserRegister.phone, [
          Validators.required,
          Validators.pattern(this.phonePattern),
        ]),
        password: new FormControl(this.UserRegister.password, [
          Validators.required,
          Validators.minLength(8),
        ]),
      }));
  }
  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get plateNumber() {
    return this.registerForm.get('plateNumber');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get password1() {
    return this.registerForm.get('password1');
  }

  get loginphone() {
    return this.loginForm.get('phone');
  }
  get loginpassword() {
    return this.loginForm.get('password');
  }
  UserRegister: any = {
    username: '',
    email: '',
    phone: '',
    plateNumber: '',
    password: '',
    password1: '',
  };
  UserLogin: any = {
    phone: '',
    password: '',
  };
  
  onRegister() {
    if (this.registerForm.valid) {
      // perform logic for signup
      const obj = {
        username: this.UserRegister.username,
        email: this.UserRegister.email,
        phone: this.UserRegister.phone,
        plateNumber: this.UserRegister.plateNumber,
        password: this.UserRegister.password,
        position: "Downtown, Cairo"
      };
      this.auth.signUpDriver(obj).subscribe({
        next: (res) => {
          alert(res.message);
          this.router.navigate(['/home'])
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
      console.log(this.registerForm.value);
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Send the obj to database
      const obj = {
        username: '',
        email: '',
        phone: this.UserLogin.phone,
        plateNumber: '',
        password: this.UserLogin.password,
        position: ''
      };
      this.auth.loginDriver(obj).subscribe({
        next: (res) => {
          alert(res.message);
          this.router.navigate(['/home'])
        },
        error: (err) => {
          alert(err?.error.message);
          this.loginForm.reset()
        },
      });
    }
  }
}
