import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UploadFilesService } from '../Services/upload-files.service';
import { AuthentificationService } from '../Services/authentification.service'
import { NgForm } from '@angular/forms';
import { StockageService } from '../Services/stockage.service';


const rust = import("../../../wasm/pkg");

@Injectable()

@Component({
  selector: 'DV-platform-sharing',
  templateUrl: './platform-sharing.component.html',
  styleUrls: ['./platform-sharing.component.css']
})
export class PlatformSharingComponent implements OnInit {
  filename 
  selectedFile
  key1
  text
  length
  type
  tab
  id
 

  constructor(private uploadService: UploadFilesService, private HttpClient: HttpClient, private authService: AuthentificationService,  private stockService: StockageService ) { }

  ngOnInit(): void {   
  }
  
  onSubmit(form: NgForm){
    


  }
  keepFile(event:any){
	  this.filename = event.target.files[0].name;
    this.length = event.target.files[0].size;
    this.type = event.target.files[0].type;
	  this.selectedFile = event.target.files[0];
   
    var accept = {
      binary : ["image/png", "image/jpeg"],
      text   : ["text/plain", "text/css", "application/xml", "text/html"]
    };

    if (this.length<5000000)
    {
  
      
          var reader = new FileReader();
            reader.onload = (e) => {
           /*this.text*/ var data=  reader.result;//binary 
          this.text = new Uint8Array(data)
            console.log(this.text)
            }
            reader.readAsArrayBuffer(this.selectedFile);   
    }
    else {
      alert("Votre fichier est trop grand");
    }
  }
  keepKey(event:any){
	  this.key1 = event.target.value;
  }

  chiffrement(){
    
    if(this.length <5000000)
    {
	    rust.then( res => {
	      var result = res.encrypt_bin(this.text, this.key1);
        console.log(result);
        console.log(this.authService.passwd.slice(40,72))
        var result2 = res.encrypt(this.key1, this.authService.passwd.slice(40,72))
        console.log(result2);
	      this.uploadService.upload(this.filename, result,result2, this.length, this.type);       
	     });
    }
  
  }
  
  

}
