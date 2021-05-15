import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { StockageService } from './stockage.service';


const rust = import("../../../wasm/pkg");
@Injectable({
  providedIn: 'root'
})
export class EchangeService {

  token
  pubkey
  sharedsecret
  sharedsecret2
  dechifferkey
  chifferkey
  secret
  constructor(private http: HttpClient, private authService: AuthentificationService, private router: Router, private storageService: StockageService) {
    this.token = this.authService.token
  }

  upload_pub(pubkey, username, secret) {


    this.secret = secret
    console.log(secret)
    var id_c
    const headers = { 'Content-Type': 'application/json' }

    this.http
      .post('/change/pubkey',
        { "pubkey": pubkey, "username": username }, { headers })
      .subscribe(
        (response) => {
          id_c = response['id'];


        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  get_pubkey(username: String, result, filename) {
    console.log(this.authService.token)
    console.log(this.secret)

    const headers = { 'Content-Type': 'application/json' }
    this.http
      .get(`/change/pubkey/${username}`, { headers })
      .subscribe(
        (response) => {

          this.pubkey = response
          console.log(this.pubkey)
          rust.then(res => {
            console.log('secret' + this.secret)
            console.log('pubkey' + this.pubkey)
            this.sharedsecret = res.diffie_hellman(this.secret, this.pubkey)
            console.log(this.sharedsecret)
            this.chifferkey = res.encrypt_dh(result, this.sharedsecret)
            console.log(this.chifferkey)
            this.upload_key(this.chifferkey, filename)
            this.upload_exchange(filename, username)
          })
        }
      )
  }
  get_pubkey2(username, result, filename) {


    const headers = { 'Content-Type': 'application/json' }
    this.http
      .get(`/change/pubkey/${username}`, { headers })
      .subscribe(
        (response) => {

          this.pubkey = response

          rust.then(res => {
            console.log('secret' + this.secret)
            console.log('pubkey' + this.pubkey)
            this.sharedsecret2 = res.diffie_hellman(this.secret, this.pubkey)
            console.log(this.sharedsecret2)
            this.dechifferkey = res.decrypt_dh(result, this.sharedsecret2)
            console.log(this.dechifferkey)
            console.log(filename)
            this.get_id_usersrc(filename, username).subscribe(
              id => this.storageService.download_content(id).subscribe(
                content => this.dechiffrement(content, filename, this.dechifferkey)
              )

            )


          })
        }
      )
  }
  upload_key(key, filename) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` }
    this.http
      .post(`/exch/key`, { "filename": `${filename}`, "key": `${key}` }, { headers })
      .subscribe(
        () => {

        },
        (error) => {

          alert("Votre fichier a été échangé ")
          // this.router.navigate(['/archive']);
        }
      );
  }
  upload_exchange(filename, usernamedst) {
    var user = this.authService.user
    console.log(user)
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` }
    this.http
      .post(`/exch/exchange`, { "filename": `${filename}`, "usernamedst": usernamedst, "usernamesrc": user }, { headers })
      .subscribe(
        () => {

        },
        (error) => {
          console.log("ici");
          alert("Votre fichier a été échangé ")
          // this.router.navigate(['/archive']);
        }
      );
  }
  getFilesExchange() {
    var username = this.authService.user
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` }
    return this.http.get(`/exch/exchange/${username}`, { headers })
  }
  download_key(name) {
    const headers = { 'Content-type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` }
    return this.http
      .get(`/exch/recup/${name}`, { headers, responseType: 'text' })
  }
  getUser(filename) {

    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` }
    return this.http.get(`/exch/user/${filename}`, { headers })
  }
  deleteEchange(id, filename) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` }
    this.http
      .delete(`/exch/delete/${id}`, { headers })
      .subscribe(
        () => {
          console.log('Fichier supprimé');
          this.delete_key(filename)
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  get_id(filename: String) {
    var username = this.authService.user
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` }
    return this.http
      .get(`/exch/id/${username}/${filename}`, { headers });
  }
  delete_key(filename) {
    const headers = { 'Authorization': `Bearer ${this.token}` }
    this.http
      .delete(`/exch/remove/${filename}`, { headers })
      .subscribe(
        () => {
          console.log('Fichier supprimé');

        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  //get file id
  get_id_usersrc(filename: String, username: String) {

    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.token}` }
    return this.http
      .get(`/stock/file/${username}/${filename}`, { headers });
  }
  dechiffrement(content, filename, key) {
    console.log(content)
    // var iteration = Math.trunc(content.length / 5120);
    //console.log(iteration)
    //console.log(this.result)


    rust.then(res => {
      //for (var i = 0; i < iteration; i++) {
      //console.log(i)
      //console.log(content.slice(5120* i, 5120 * (i + 1)))

      var result2 = res.decrypt_bin(content/*.slice(5120 * i, 5120* (i + 1))*/, key);
      console.log(result2)
      //this.resulttot.concat(result2)
      // console.log(this.resulttot)
      // }

      console.log(filename)
      this.storageService.get_type(filename).subscribe(type =>
        this.downloadToFile(result2, filename, type))// modify 
    });


  }
  downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };
}
