import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: 'user-register.component.html'
})

export class UserRegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    repassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)])
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  submit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      this.authService.registerUser({ email, password } as AuthModel).then(result => {
        this.authService.loginUser({ email, password } as AuthModel).then(user => {
          this.authService.setDefaultUserInStoarge({ email, password });

          this.router.navigate(['/general'])
        })
      })
    }
  }
}