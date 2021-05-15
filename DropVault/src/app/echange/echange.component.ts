import { Component, Injectable, OnInit } from '@angular/core';
import { AuthentificationService } from '../Services/authentification.service';
import { UploadFilesService } from '../Services/upload-files.service';
import { HttpClient } from '@angular/common/http'
import { StockageService } from '../Services/stockage.service';
import { EchangeService } from '../Services/echange.service';

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
  pubkey
  listFile 
  result3
 

  constructor(private uploadService: UploadFilesService, private stockService: StockageService, private HttpClient: HttpClient, private authService: AuthentificationService, private echangeService: EchangeService) { }

  ngOnInit(): void {
   
  }
  
  actualise() {
    this.echangeService.getFilesExchange().subscribe((response) => this.listFile = response);
    
  }
  onDelete(name: string) {
    var id = this.echangeService.get_id(name).subscribe(
      id => this.echangeService.deleteEchange(id,name)
    )
  }
  echange() {

    this.key_decrypt = this.stockService.get_id(this.filename).subscribe(
      id => this.stockService.download_key(id).subscribe(
        key => this.dechiffrement_key(key))
    )

  }
  dechiffrement_key(key) {
    rust.then(res => {
      console.log(key);
      console.log(this.authService.passwd.slice(40, 72))
      this.result = res.decrypt(key, this.authService.passwd.slice(40, 72))
      console.log(this.result)
      console.log(this.user)
      this.echangeService.get_pubkey(this.user, this.result, this.filename)
          

    });
    
    
    //rust.then(res => { res.diffie_hellman_alice(this.result, this.pubkey) }
    //)
    // this.result2 = res.diffie_hellman(this.result)
    //console.log(this.result2)




  }
  download(filename){
    this.result3 =this.echangeService.download_key(filename).subscribe(
      key => this.diffiehellman(key, filename)
    )

  }
  diffiehellman(key, filename){
    console.log(key)
    this.echangeService.getUser(filename).subscribe(
      login => this.echangeService.get_pubkey2(login, key, filename)
    )
    

  }

  keepUser(event: any) {
    this.user = event.target.value;
  }
  keepFilename(event: any) {
    this.filename = event.target.value;
  }


}
