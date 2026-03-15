import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import localeBg from '@angular/common/locales/bg';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(localeBg, 'bg');

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'bg' },
  ],
};
