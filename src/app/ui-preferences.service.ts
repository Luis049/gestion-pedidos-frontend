import { Injectable } from '@angular/core';
import { ITokens, TOKENS_JSON } from './styles';
import { GetInfoCompany, GetInfoUser } from "../app/presentation/apiRquest";


@Injectable({
  providedIn: 'root'
})
export class UiPreferencesService {

  loadUserPreferences() {
    GetInfoCompany.execute().then((response) => {
      const tokens = { ...TOKENS_JSON };
      if(response?.preferences.colorPrimary){
        tokens.color.primary = response?.preferences.colorPrimary;
      }
      if(response?.preferences.colorSecondary){
        tokens.color.secondary = response?.preferences.colorSecondary;
      }
      this.applyUserPreferences(tokens);
    });
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
