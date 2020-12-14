
import { FormulaireComponent } from './formulaire/formulaire.component';
import { PlatformSharingComponent } from './platform-sharing/platform-sharing.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  {path : 'auth', component: FormulaireComponent},
  {path : 'share', component : PlatformSharingComponent},
  {path : 'accueil', component: AccueilComponent},
  {path : '', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
