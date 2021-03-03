import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UploadFilesService } from '../Services/upload-files.service';
import { AuthentificationService } from '../Services/authentification.service'
import { NgForm } from '@angular/forms';


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
  tab: any[]
 

  constructor(private uploadService: UploadFilesService, private HttpClient: HttpClient, private authService: AuthentificationService ) { }

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
      
        if(this.length>100000)
        {
          /*var chunk = this.length/10000
          for(var i=0; i< chunk; i++){
              const reader = new FileReader();
              reader.onload = (e) => {
                this.text = reader.result.toString().trim();
                console.log(this.text.slice(10000*i, 10000*(i+1)))
                
              }
              reader.readAsBinaryString(this.selectedFile);         
        }*/
      }
       else{
          const reader = new FileReader();
            reader.onload = (e) => {
            this.text = reader.result.toString().trim();
            console.log(this.text)
            }
            reader.readAsText(this.selectedFile);
        }
    }
    else {
      alert("Votre fichier est trop grand");
    }
  }
  keepKey(event:any){
	  this.key1 = event.target.value;
  }

  chiffrement(){
    
	    rust.then( res => {
	      var result = res.encrypt(this.text, this.key1);
	      this.uploadService.upload(this.filename, result, this.length, this.type); 
  
	     });
  }
  chunk(slice){
    
    rust.then( res => {
      var result = res.encrypt(slice, this.key1);
      this.uploadService.upload(this.filename, result, this.length, this.type); 

     });
  }

}
