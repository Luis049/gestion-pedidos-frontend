import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Output,
  signal,
} from '@angular/core';
import { SdCardComponent } from '../../../../../components/atoms/sd-card/sd-card.component';
import { TitleComponent } from '../../../../../components/atoms/title/title.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UiPreferencesService } from '../../../../../../ui-preferences.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../../../../infrastructure/context/auth/login.service';
import { HttpModule } from '../../../../../../infrastructure/shared/http/http.module';
import { take } from 'rxjs';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    CommonModule,
    SdCardComponent,
    TitleComponent,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [LoginService],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLoginComponent {
  credentialsInvalid = false;
  loginForm: FormGroup;
  loading = signal(false);

  loginService = inject(LoginService);
  uiPreferences = inject(UiPreferencesService);
  router = inject(Router);
  changeDetectorRef = inject(ChangeDetectorRef);
  fb = inject(FormBuilder);

  constructor() {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required] ),
      password: new FormControl('', [
        Validators.required,
        ...(!this.isAdmin
          ? [Validators.minLength(10), Validators.maxLength(10)]
          : []),
      ]),
    });
  }

  get isAdmin() {
    return this.router.url === '/admin-login';
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    if (this.isAdmin) {
      await this.loginAdmin();
    } else {
      await this.loginClient();
    }
  }

  loginAdmin() {
    this.loading.set(true);

    this.loginService
      .loginAdmin({
        username: this.loginForm.value.username.toLowerCase().trim() || '',
        password: this.loginForm.value.password || '',
      })
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          result.fold(
            (error) => {
              this.credentialsInvalid = true;
              this.changeDetectorRef.detectChanges();
              this.loading.set(false);
            },
            (response) => {
              console.log('login admin 1', new Date().getTime());
              this.credentialsInvalid = false;
              this.uiPreferences.loadUserPreferences();
              console.log('login admin 2', new Date().getTime());
              this.router.navigate(['/dashboard']);
              this.loading.set(false);
            },
          );
        },
      });
  }

  async loginClient() {
    this.loading.set(true);
    this.loginService
      .loginClient({
        username: this.loginForm.value.username.toLowerCase().trim() || '',
        password: this.loginForm.value.password || '',
      })
      .subscribe({
        next: (result) => {
          result.fold(
            (error) => {
              this.credentialsInvalid = true;
              this.changeDetectorRef.detectChanges();
              this.loading.set(false);
            },
            (response) => {
              this.credentialsInvalid = false;
              this.uiPreferences.loadUserPreferences();
              this.router.navigate(['/dashboard']);
              this.loading.set(false);
            },
          );
        },
      });
  }

  get getErrorUsername() {
    return (
      this.loginForm.get('username')?.touched &&
      this.loginForm.get('username')?.getError('required')
    );
  }

  get getErrorPassword() {
    return (
      this.loginForm.get('password')?.touched &&
      this.loginForm.get('password')?.getError('required')
    );
  }

  get getErrorPasswordFormat() {
    return (
      this.loginForm.get('password')?.touched &&
      (this.loginForm.get('password')?.getError('minlength') ||
        this.loginForm.get('password')?.getError('maxlength'))
    );
  }

  get getLabelCredentials() {
    return this.isAdmin ? 'Contraseña' : 'Telefono';
  }

  get typeCredentials() {
    return this.isAdmin ? 'password' : 'string';
  }

  get textMessage() {
    return this.isAdmin
      ? 'Ingrese su usuario y contraseña para continuar'
      : 'Ingrese su usuario y teléfono para continuar';
  }

  redirectToAdminLogin() {
    this.router.navigate(['admin-login']);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onNameInput(event: Event): void {
    const input = event as InputEvent;
    const element = input.target as HTMLInputElement;
    const trimmedValue = element.value.replace(/\s+/g, '');
    this.loginForm.get('username')?.setValue(trimmedValue);
  }

  phoneNumber: string = '';

  onPhoneInput(event: Event): void {
    const input = event as InputEvent;
    const element = input.target as HTMLInputElement;

    if (this.typeCredentials === 'string') {
      // Prevenir la entrada si no es un número (excepto backspace y delete)
      if (input.inputType === 'insertText' && !/^\d$/.test(input.data || '')) {
        element.value = this.phoneNumber;
        return;
      }

      // Obtener solo los números del valor actual
      const digits = element.value.replace(/\D/g, '');

      // Limitar a 10 dígitos
      const limitedDigits = digits.slice(0, 10);

      // Formatear el número
      let formattedNumber = '';
      if (limitedDigits.length > 0) {
        const parts = limitedDigits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
        if (parts) {
          formattedNumber = parts
            .slice(1)
            .filter((part) => part)
            .join('-');
        }
      }

      // Actualizar el valor mostrado y el valor del formulario
      this.phoneNumber = formattedNumber;
      this.loginForm.get('password')?.setValue(limitedDigits);
      element.value = formattedNumber;

      // Forzar la actualización de la vista
      this.changeDetectorRef.detectChanges();
    } else {
      this.loginForm.get('password')?.setValue(element.value);
    }
  }
}
