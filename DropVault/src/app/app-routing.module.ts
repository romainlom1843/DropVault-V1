
import { FormulaireComponent } from './formulaire/formulaire.component';
import { PlatformSharingComponent } from './platform-sharing/platform-sharing.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ErrorComponent } from './error/error.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from './Services/guard.service';
import { EchangeComponent } from './echange/echange.component';
import { StockageComponent } from './stockage/stockage.component';





const routes: Routes = [
  {path : 'auth', component: FormulaireComponent},
  {path : 'share', canActivate: [GuardService], component : EchangeComponent},
  {path : '', component: AccueilComponent},
  {path : 'login', component: SignInComponent },
  {path : 'archive', canActivate: [GuardService], component: StockageComponent },
  {path : 'upload', canActivate: [GuardService], component: PlatformSharingComponent },
  {path: 'not-found', component: ErrorComponent },
  {path: '**', redirectTo: 'not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
