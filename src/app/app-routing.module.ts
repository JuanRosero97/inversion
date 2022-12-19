import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { InversionComponent } from './components/inversion/inversion.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [NoAuthGuard],
    component: RegisterComponent,
  },
  {
    path: 'simulador/:cod',
    // canActivate: [NoAuthGuard],
    component: InversionComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
