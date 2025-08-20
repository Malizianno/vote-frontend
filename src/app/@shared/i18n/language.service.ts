import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  constructor(private translate: TranslateService) {}

  init() {
    const savedLang = localStorage.getItem('lang') || 'ro';
    this.translate.addLangs(['en', 'ro']);
    this.translate.setDefaultLang('ro');
    this.translate.use(savedLang);
  }

  switch(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  getCurrentLang(): string {
    return this.translate.currentLang;
  }
}
