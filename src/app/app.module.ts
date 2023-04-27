import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LocalForageService } from './services/local-forage.service';
import { DataStorageSqliteService } from './services/data-storage-sqlite.service';

export const API_URL = new InjectionToken<string>('__API_URL__');
export const STORAGE_ADAPTER_SERVICE = new InjectionToken<string>(
  '__STORAGE_ADAPTER_SERVICE__'
);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: API_URL,
      useValue: 'http://SomeEndPoint.com/api',
    },
    {
      provide: STORAGE_ADAPTER_SERVICE,
      deps: [Platform],
      useFactory: (platform: Platform) => {
        if (platform.is('capacitor')) {
          console.log('STORAGE SQLITE CAPACITOR');
          return new DataStorageSqliteService();
        }
        return new LocalForageService();
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
