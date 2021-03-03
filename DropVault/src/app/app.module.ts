import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { PlatformSharingComponent } from './platform-sharing/platform-sharing.component';
import { AccueilComponent } from './accueil/accueil.component';
import { from } from 'rxjs';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { AuthentificationService } from './Services/authentification.service';
import { ErrorComponent } from './error/error.component';
import { GuardService } from './Services/guard.service';
import { EchangeComponent } from './echange/echange.component';
import { StockageComponent } from './stockage/stockage.component'




@NgModule({
  declarations: [
    AppComponent,
    FormulaireComponent,
    PlatformSharingComponent,
    AccueilComponent,
    SignInComponent,
    ErrorComponent,
    EchangeComponent,
    StockageComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthentificationService,GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
