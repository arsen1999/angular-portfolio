import {NgModule} from '@angular/core';
import {SigninGuard} from "./common/guards";
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from "./components/signin/signin.component";


const routes: Routes = [
  {path: '', redirectTo: 'dashboard/users', pathMatch: 'full'},
  {path: 'signin', component: SigninComponent, canActivate: [SigninGuard]},
  {path: 'dashboard', redirectTo: 'dashboard/users'},
  {path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: '**', redirectTo: 'dashboard/users'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
