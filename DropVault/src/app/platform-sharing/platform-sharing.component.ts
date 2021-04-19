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
  i=0

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
  
      
          const reader = new FileReader();
            reader.onload = (e) => {
            this.text = reader.result.toString().trim();
            console.log(this.text)
            }
            reader.readAsText(this.selectedFile);
        
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
	      var result = res.encrypt(this.text, this.key1);
	      this.uploadService.upload(this.filename, result, this.length, this.type); 
      
	     });
    }
  
  }
  
  

}
