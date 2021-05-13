import { Component, Injectable, OnInit } from '@angular/core';
import { AuthentificationService } from '../Services/authentification.service';
import { UploadFilesService } from '../Services/upload-files.service';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { StockageService } from '../Services/stockage.service';

const rust = import("../../../wasm/pkg");
@Injectable()
@Component({
  selector: 'DV-echange',
  templateUrl: './echange.component.html',
  styleUrls: ['./echange.component.css']
})



export class EchangeComponent implements OnInit {
  filename
  selectedFile
  text
  user
  length
  type
  key_decrypt
  result
  result2

  constructor(private uploadService: UploadFilesService, private stockService: StockageService, private HttpClient: HttpClient, private authService: AuthentificationService) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {

  }
 echange() {

  this.key_decrypt = this.stockService.get_id(this.filename).subscribe(
    id => this.stockService.download_key(id).subscribe(
      key => this.dechiffrement_key(key))
  )
   
  }
  dechiffrement_key(key){
    rust.then(res => {
      console.log(key);
      console.log(this.authService.passwd.slice(40,72))
      this.result = res.decrypt(key, this.authService.passwd.slice(40, 72))
      console.log(this.result)
     // this.result2 = res.diffie_hellman(this.result)
      //console.log(this.result2)

    });


  }

  keepUser(event: any) {
    this.user = event.target.value;
  }
  keepFilename(event: any) {
    this.filename = event.target.value;
  }
 
 
}
