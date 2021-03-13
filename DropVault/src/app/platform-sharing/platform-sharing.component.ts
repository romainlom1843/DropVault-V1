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
      
        if(this.length>100000)
        {
          this.uploadService.upload_big(this.filename,this.length, this.type)
          this.id = this.stockService.get_id(this.filename)
          this.chunk_file(this.i)  
        
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
    if(this.length <100000)
    {
	    rust.then( res => {
	      var result = res.encrypt(this.text, this.key1);
	      this.uploadService.upload(this.filename, result, this.length, this.type); 
      
	     });
    }
    else{
      
      this.chunk(this.tab)
    }
  }
  chunk(slice){
    
    rust.then( res => {
      var result = res.encrypt(slice, this.key1);
      console.log(result)
      this.id=this.stockService.get_id(this.filename)
      console.log(this.id)
      this.uploadService.upload_file(result, this.id); 
      while(this.i<2){
        this.i= this.i+1
        console.log(this.i)
        this.chunk_file(this.i)
        this.chunk(this.tab)

      }

     });
  }
  chunk_file(i){
    

        const reader = new FileReader();
        reader.onload = (e) => {
          this.text = reader.result.toString().trim();
          this.tab=this.text.slice(20*i, 40*(i+1))
          console.log(this.tab)
         
        }
        reader.readAsBinaryString(this.selectedFile);       
  }

}
