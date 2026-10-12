import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-add-edit-dialog',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule],
  templateUrl: './add-edit-dialog.html',
})
export class AddEditDialog {
  private fb = inject(FormBuilder);

  user = input<PlaceholderUser | null>(null);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.minLength(12)],
  });

  constructor() {
    effect(() => {
      const u = this.user();
      if (!u) {
        this.form.reset();
        return;
      }
      this.form.patchValue({
        name: u.name,
        username: u.username,
        email: u.email,
        phone: u.phone.startsWith('+995 ') ? u.phone.slice(5) : '',
      });
    });
  }

  formatPhone(event: Event) {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 9);
    const formatted = [
      digits.slice(0, 3),
      digits.slice(3, 5),
      digits.slice(5, 7),
      digits.slice(7, 9),
    ]
      .filter(Boolean)
      .join(' ');

    input.value = formatted;
    this.form.controls.phone.setValue(formatted);
  }

  getValue() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((c) => {
        c.markAsDirty();
        c.updateValueAndValidity();
      });
      return null;
    }
    const value = this.form.getRawValue();
    return { ...value, phone: value.phone ? `+995 ${value.phone}` : '' };
  }
}
