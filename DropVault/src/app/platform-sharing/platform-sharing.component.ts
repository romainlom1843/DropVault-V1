import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UploadFilesService } from '../Services/upload-files.service';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../Services/authentification.service'


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
  filename2 
  selectedFile2 
  selectedFiles?: FileList;
  listFile 
  key1:string
  key2
  key3
  text:string
  text2
  user
  length
  type
 

  fileInfos?: Observable<any>;

  constructor(private uploadService: UploadFilesService, private HttpClient: HttpClient, private authService: AuthentificationService ) { }

  ngOnInit(): void {
    this.listFile= this.uploadService.getFiles();
     
  }
  getfiles(){
    this.listFile= this.uploadService.getFiles();
  }


  download(name:string){
    
    var id = this.uploadService.get_id(name);
    var content = this.uploadService.download_content(id)
    this.dechiffrement(content);
  }
  onDelete(name:string){
    var id = this.uploadService.get_id(name);
    this.uploadService.deleteFiles(id);
  }
  keepFile(event:any){
	  this.filename = event.target.files[0].name;
    this.length = event.target.files[0].size;
    this.type = event.target.files[0].type;
	  this.selectedFile = event.target.files[0];
    if (this.length<5000000)
    {
      const reader = new FileReader();
      reader.onload = (e) => {
      this.text = reader.result.toString().trim();
      }
      reader.readAsText(this.selectedFile);
    }
    else {
      alert("fichier trop grand");
    }
  }
  keepFile2(event:any){
	  this.filename2 = event.target.files[0].name;
    this.length = event.target.files[0].length;
    console.log(this.length)
	  this.selectedFile2 = event.target.files[0];
	  const reader = new FileReader();
	  reader.onload = (e) => {
	  this.text2 = reader.result.toString().trim();
	  }
	  reader.readAsText(this.selectedFile2);
  }
  
  keepKey(event:any){
	  this.key1 = event.target.value;
  }
  keepKey2(event:any){
	  this.key2 = event.target.value;
	  console.log(this.key2);
  }
  keepKey3(event:any){
	  this.key3 = event.target.value;
  }
  keepUser(event:any){
    this.user =event.target.value;
  }
  chiffrement(){
    
	    rust.then( res => {
	      var result = res.encrypt(this.text, this.key1);
	      this.uploadService.upload(this.filename, result); 
  
	     });
  }


  chiffrement_echange(){
    
    rust.then( res => {
      var result = res.encrypt(this.text2, this.key3);
      console.log(result);
      this.uploadService.echange(result, this.filename2, this.user);
     });
}
  dechiffrement(content){
    
    rust.then( res => {
      var result = res.decrypt(content, this.key2);
      console.log("ce",result);
      this.downloadToFile(result, this.filename, 'text/plain')
 
     
     });

  }
  downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
  
    URL.revokeObjectURL(a.href);
  };

}
