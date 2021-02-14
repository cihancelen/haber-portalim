import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: 'user-login.component.html'
})

export class UserLoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)])
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  submit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value as AuthModel;

      this.authService.loginUser(credentials).then(result => {        
        if (!result.error) {
          this.router.navigate(['/general']);
        }
      })
    }
  }
}