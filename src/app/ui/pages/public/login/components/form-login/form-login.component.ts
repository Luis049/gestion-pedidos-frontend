import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Output } from '@angular/core';
import { CardComponent } from '../../../../../components/atoms/card/card.component';
import { TitleComponent } from '../../../../../components/atoms/title/title.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { apiLogin} from '../../../../../../presentation/apiRquest';
import { UiPreferencesService } from '../../../../../../ui-preferences.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    TitleComponent,

    ReactiveFormsModule
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLoginComponent {
  credentialsInvalid = false;
  requestLogin = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private uiPreferences: UiPreferencesService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  async onSubmit(){
    if(this.loginForm.invalid){
      return;
    }
    this.requestLogin = true;
    const result = await apiLogin.loginAdmin.execute({
      username: this.loginForm.value.username || '',
      password: this.loginForm.value.password || ''
    })

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
    )
  }

  get getErrorUsername(){
    return  this.loginForm.get('username')?.touched && this.loginForm.get('username')?.getError('required');
  }

  get getErrorPassword(){
    return this.loginForm.get('password')?.touched && this.loginForm.get('password')?.getError('required');
  }
 }
