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
    var content = this.uploadService.dowload(id)
    this.dechiffrement(content);
  }
  onDelete(name:string){
    var id = this.uploadService.get_id(name);
    this.uploadService.deleteFiles(id);
  }
  keepFile(event:any){
	  this.filename = event.target.files[0].name;
	  console.log(this.filename);
	  this.selectedFile = event.target.files[0];
	  const reader = new FileReader();
	  reader.onload = (e) => {
	  this.text = reader.result.toString().trim();
		console.log(this.text);
	  }
	  reader.readAsText(this.selectedFile);
  }
  keepFile2(event:any){
	  this.filename2 = event.target.files[0].name;
	  console.log(this.filename2);
	  this.selectedFile2 = event.target.files[0];
	  const reader = new FileReader();
	  reader.onload = (e) => {
	  this.text2 = reader.result.toString().trim();
		console.log(this.text2);
	  }
	  reader.readAsText(this.selectedFile2);
  }
  
  keepKey(event:any){
	  this.key1 = event.target.value;
	  console.log(this.key1);
  }
  keepKey2(event:any){
	  this.key2 = event.target.value;
	  console.log(this.key2);
  }
  keepKey3(event:any){
	  this.key3 = event.target.value;
	  console.log(this.key3);
  }
  keepUser(event:any){
    this.user =event.target.value;
    console.log(this.user)
  }
  chiffrement(){
      console.log(this.text, this.key1)
	    rust.then( res => {
	      var result = res.encrypt(this.text, this.key1);
	      console.log(result);
	      this.uploadService.upload(result, this.filename);
	     });
  }
  chiffrement_echange(){
    console.log(this.text2, this.key3)
    rust.then( res => {
      var result = res.encrypt(this.text2, this.key3);
      console.log(result);
      this.uploadService.echange(result, this.filename2, this.user);
     });
}
  dechiffrement(content:string){
    rust.then( res => {
      var result = res.decrypt(content, this.key2);
      console.log(result);
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
