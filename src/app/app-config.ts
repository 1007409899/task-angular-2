import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideAnimations( ),
    LoadingInterceptor,
    provideHttpClient(
      withInterceptors([ (req, next) => inject(LoadingInterceptor).intercept(req, { handle: next }) ])
    ),
    importProvidersFrom(HttpClientModule, MatSnackBarModule, MatDialogModule ),]
};
