import { HttpClientModule } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()

export class AuthentificationService {

    isAuth = false;
    constructor(private HttpClient: HttpClientModule)
    {
        
    }
    signIn() {
      return new Promise(
        (resolve, reject) => {
          setTimeout(
            () => {
              this.isAuth = true;
              resolve(true);
            }, 2000
          );
        }
      );
    }
  
    signOut() {
      this.isAuth = false;
    }
  }