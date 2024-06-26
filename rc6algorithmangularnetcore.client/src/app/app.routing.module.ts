import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './pages/invoice-details/invoice-details.component';
import { Rc6Component } from './pages/rc6/rc6.component';
import { AuthComponent } from './pages/auth/auth.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'invoices', component: InvoiceListComponent },
  { path: 'invoice/:id', component: InvoiceDetailsComponent },
  { path: 'rc6', component: Rc6Component },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
