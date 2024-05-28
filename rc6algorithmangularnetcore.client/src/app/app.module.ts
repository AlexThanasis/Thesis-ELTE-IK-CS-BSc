import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoaderComponent } from './elements/loader/loader.component';
import { InvoiceDetailsComponent } from './pages/invoice-details/invoice-details.component';
import { NavigationComponent } from './elements/navigation/navigation.component';
import { FooterComponent } from './elements/footer/footer.component';
import { AuthenticationInterceptor } from './services/interceptor';
import { AuthComponent } from './pages/auth/auth.component';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { Rc6Component } from './pages/rc6/rc6.component';
import { AppRoutingModule } from './app.routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { InvoiceListDetailComponent } from './elements/invoice-list-detail/invoice-list-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    InvoiceDetailsComponent,
    NavigationComponent,
    FooterComponent,
    AuthComponent,
    InvoiceListComponent,
    Rc6Component,
    ProfileComponent,
    WelcomeComponent,
    InvoiceListDetailComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
