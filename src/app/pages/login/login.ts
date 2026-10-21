import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Auth } from '../../auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzIconModule],
  templateUrl: './login.html',
})
export class Login implements OnInit {
  ngOnInit(): void {
    localStorage.removeItem('loggedIn');
    this.auth.logout();
  }

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(Auth);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    this.auth.login();
    this.router.navigate(['/']);
  }
}
