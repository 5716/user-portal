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
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-96 bg-white p-8 rounded-xl shadow flex flex-col gap-4">
        <h1 class="text-xl font-semibold text-center">სისტემაში შესვლა</h1>
        <form nz-form [formGroup]="form" (ngSubmit)="submit()">
          <nz-form-item>
            <nz-form-control nzErrorTip="შეიყვანე ელ-ფოსტა სწორი ფორმატით">
              <input
                nz-input
                formControlName="email"
                placeholder="ელ-ფოსტა"
                autocomplete="saba-email"
              />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control nzErrorTip="საჭიროა მინიმუმ 6 სიმბოლო">
              <nz-input-password>
                <input
                  nz-input
                  placeholder="პაროლი"
                  formControlName="password"
                  autocomplete="current-password"
                />
                <ng-template nzInputPasswordIcon let-visible>
                  @if (visible) {
                    <nz-icon nzType="eye" nzTheme="twotone" />
                  } @else {
                    <nz-icon nzType="eye-invisible" nzTheme="outline" />
                  }
                </ng-template>
              </nz-input-password>
            </nz-form-control>
          </nz-form-item>
          <button nz-button nzType="primary" nzBlock [disabled]="form.invalid">შესვლა</button>
        </form>
        <!-- <p class="text-center text-sm">
            არ ხარ დარეგისტრირებული? <a routerLink="/signup" class="text-blue-600">რეგისტრაცია</a>
          </p> -->
      </div>
    </div>
  `,
})
export class Login implements OnInit {
  ngOnInit(): void {
    localStorage.removeItem('loggedIn');
  }

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(Auth);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    // if (this.form.invalid) {
    //   Object.values(this.form.controls).forEach(c => { c.markAsDirty(); c.updateValueAndValidity(); });
    //   return;
    // }
    this.auth.login();
    this.router.navigate(['/dashboard']);
  }
}
