import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InversionComponent } from './components/inversion/inversion.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastsContainer } from './components/toast-container/toast-container.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReplacePipe } from '../app/pipes/replace-pipe';

@NgModule({
  declarations: [
    AppComponent,
    InversionComponent,
    RegisterComponent,
    SidebarComponent,
    ToastsContainer,
    ReplacePipe,
  ],
  imports: [
    NgxSliderModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
