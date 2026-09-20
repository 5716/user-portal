import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Auth } from '../../auth';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, NzFormModule, NzInputModule, NzSelectModule, NzButtonModule, NzRadioModule, NzFlexModule, NzIconModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <form nz-form [formGroup]="form" (ngSubmit)="submit()"
            class="w-96 bg-white p-8 rounded-xl shadow">
        <h1 class="text-2xl font-semibold text-center mb-6">რეგისტრაცია</h1>

        <nz-form-item>
          <nz-form-control nzErrorTip="შეიყვანე სრული სახელი">
            <input nz-input formControlName="name" placeholder="სრული სახელი" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-control nzErrorTip="შეიყვანე სწორი ელ-ფოსტა">
            <input nz-input formControlName="email" placeholder="ელ-ფოსტა" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
        <nz-form-control nzErrorTip="აირჩიე სქესი">
          <nz-radio-group formControlName="gender">
            <label nz-radio nzValue="Male">მამრობითი</label>
            <label nz-radio nzValue="Female">მდედრობითი</label>
          </nz-radio-group>
        </nz-form-control>
      </nz-form-item>

        <nz-form-item>
          <nz-form-control nzErrorTip="როლის არჩევა სავალდებულოა">
            <nz-select formControlName="role" nzPlaceHolder="აირჩიე როლი" class="w-full">
              <nz-option nzValue="Admin" nzLabel="ადმინისტრატორი"></nz-option>
              <nz-option nzValue="Editor" nzLabel="საპორტი"></nz-option>
              <nz-option nzValue="Viewer" nzLabel="სტუმარი"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
      <nz-form-control nzErrorTip="შეიყვანე მინიმუმ 6 სიმბოლო">
        <nz-input-password>
          <input nz-input placeholder="პაროლი" formControlName="password" />
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

        <button nz-button nzType="primary" nzBlock>ანგარიშის შექმნა</button>

        <p class="mt-4 text-center text-sm">
          გააქვს ანგარიში? <a routerLink="/login" class="text-blue-600">შესვლა</a>
        </p>
      </form>
    </div>
  `,
})
export class Signup {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(Auth);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    role: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(c => { c.markAsDirty(); c.updateValueAndValidity(); });
      return;
    }
    this.auth.login();
    this.router.navigate(['/dashboard']);
  }
}