import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListGasComponent } from './components/list-gas/list-gas.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/header/header.component';
import { PageNotFoundComponentComponent } from './shared/page-not-found-component/page-not-found-component.component';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    ListGasComponent,
    HeaderComponent,
    HeaderComponent,
    PageNotFoundComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    MaterialModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideClientHydration(), provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
