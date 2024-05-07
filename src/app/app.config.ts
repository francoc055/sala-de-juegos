import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"trabajo-1-78d14","appId":"1:494529733139:web:15a5bd308341d8903595e6","storageBucket":"trabajo-1-78d14.appspot.com","apiKey":"AIzaSyB5OkHjziFE6gXK72tXk4ONDbS0fqVtIGU","authDomain":"trabajo-1-78d14.firebaseapp.com","messagingSenderId":"494529733139"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), provideToastr()]
};
