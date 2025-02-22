import { Injectable } from '@angular/core';
import { ITokens, TOKENS_JSON } from './styles';
import { StorageService } from '@infrastructure/shared/storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class UiPreferencesService {

  loadUserPreferences() {
    const company = StorageService.getCompany();
    const tokens = { ...TOKENS_JSON };
    if(company?.preferences?.colorPrimary){
      tokens.color.primary = company?.preferences.colorPrimary;
    }
    if(company?.preferences?.colorSecondary){
      tokens.color.secondary = company?.preferences.colorSecondary;
    }
    this.applyUserPreferences(tokens);

  }

  applyUserPreferences(token: ITokens) {
    const root = document.documentElement;
    // Applying the tokens
    for (const [key, value] of Object.entries(token)) {
      for (const [tokenKey, tokenValue] of Object.entries(value)) {
        root.style.setProperty(`--${key}-${tokenKey}`, tokenValue as string);
      }
    }
    root.style.setProperty('--color-primary', token.color.primary);
    root.style.setProperty('--color-secondary', token.color.secondary);
    root.style.setProperty('font-size', token.typography.fontSize.md);
  }
}
