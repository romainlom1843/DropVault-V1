import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient , HttpEventType, HttpResponse } from '@angular/common/http'
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
  selectedFiles?: FileList;
  /*currentFile?: File;
  progress = 0;
  message = '';*/
   listFile 
  
 

  fileInfos?: Observable<any>;

  constructor(private uploadService: UploadFilesService, private HttpClient: HttpClient, private authService: AuthentificationService ) { }

  ngOnInit(): void {
    this.listFile= this.uploadService.getFiles();
     
  }
  getfiles(){
    this.listFile= this.uploadService.getFiles();
  }

 /* upload(content:String): void {
    this.progress = 0;
    
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
         this.uploadService.upload(content).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFiles = undefined;
    }
  }*/

  download(name:string){
    var id = this.uploadService.get_id(name);
    var content = this.uploadService.dowload(id)
    this.dechiffrement(content);
  }
  onDelete(name:string){
    var id = this.uploadService.get_id(name);
    this.uploadService.deleteFiles(id);
  }
  chiffrement(event: any){
    this.filename = event.target.files[0].name;
    console.log(this.filename);
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = reader.result.toString().trim();
        console.log(text);
      
    rust.then( res => {
      var result = res.encrypt(text);
      console.log(result);
      this.uploadService.upload(result, this.filename);
     });
    
    
  }
  reader.readAsText(this.selectedFile);
  }
  dechiffrement(content:string){
    console.log("ici");
    rust.then( res => {
      var result = res.decrypt(content);
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