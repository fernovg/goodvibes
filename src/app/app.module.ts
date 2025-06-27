import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { LoginComponent } from './pages/login/login.component';
import { NgmaterialModule } from './ngmaterial/ngmaterial.module';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { enviroment } from '../environments/environment.prod';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BlogComponent } from './pages/blog/blog.component';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');
import { LOCALE_ID } from '@angular/core';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ProductoComponent,
    NosotrosComponent,
    CatalogoComponent,
    LoginComponent,
    GaleriaComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    NgmaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AngularFireModule.initializeApp(enviroment.firebase),
    // AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(enviroment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
