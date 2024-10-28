import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Output,
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
import { apiLogin } from '../../../../../../presentation/apiRquest';
import { UiPreferencesService } from '../../../../../../ui-preferences.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [CommonModule, SdCardComponent, TitleComponent, ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLoginComponent {
  credentialsInvalid = false;
  requestLogin = false;
  loginForm: FormGroup;

  constructor(
    private uiPreferences: UiPreferencesService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
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
    this.requestLogin = true;

    if (this.isAdmin) {
      await this.loginAdmin();
    } else {
      await this.loginClient();
    }
  }

  async loginAdmin() {
    const result = await apiLogin.loginAdmin.execute({
      username: this.loginForm.value.username || '',
      password: this.loginForm.value.password || '',
    });

    result.fold(
      (error) => {
        this.credentialsInvalid = true;
        this.changeDetectorRef.detectChanges();
        this.requestLogin = false;
      },
      (response) => {
        this.credentialsInvalid = false;
        this.uiPreferences.loadUserPreferences();
        this.router.navigate(['/dashboard']);
        this.requestLogin = false;
      }
    );
  }

  async loginClient() {
    const result = await apiLogin.loginClient.execute({
      username: this.loginForm.value.username || '',
      password: this.loginForm.value.password || '',
    });

    result.fold(
      (error) => {
        this.credentialsInvalid = true;
        this.changeDetectorRef.detectChanges();
        this.requestLogin = false;
      },
      (response) => {
        this.credentialsInvalid = false;
        this.uiPreferences.loadUserPreferences();
        this.router.navigate(['/dashboard']);
        this.requestLogin = false;
      }
    );
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
    return this.isAdmin ? 'password' : 'number';
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
}
