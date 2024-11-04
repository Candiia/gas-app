import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListGasComponent } from './components/list-gas/list-gas.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListGasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(), provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
