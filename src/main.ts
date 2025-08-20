/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, enableProdMode } from '@angular/core';
import {
  provideTranslateService,
  TranslateLoader,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
