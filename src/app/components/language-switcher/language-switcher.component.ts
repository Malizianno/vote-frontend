import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/@shared/i18n/language.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent {
  @Input() withText: boolean = false;
  @Input() style: string = 'light';

  constructor(private translate: LanguageService) {
    // empty constructor
  }

  switchLanguage(lang: 'en' | 'ro') {
    this.translate.switch(lang);
  }
}
