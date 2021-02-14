import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-manager-login',
  templateUrl: 'manager-login.component.html'
})

export class ManagerLoginComponent implements OnInit {
  managerLoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)])
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  submit() {
    if (this.managerLoginForm.valid) {
      const credentials = this.managerLoginForm.value as AuthModel;

      this.authService.loginManager(credentials).then(result => {
        if (!result.error) {
          this.router.navigate(['/manager']);
        }
      })
    }
  }
}