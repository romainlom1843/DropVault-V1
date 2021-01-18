import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient , HttpEventType, HttpResponse } from '@angular/common/http'
import { UploadFilesService } from '../Services/upload-files.service';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../Services/authentification.service'

@Injectable()

@Component({
  selector: 'DV-platform-sharing',
  templateUrl: './platform-sharing.component.html',
  styleUrls: ['./platform-sharing.component.css']
})
export class PlatformSharingComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(private uploadService: UploadFilesService, private HttpClient: HttpClient, private authService: AuthentificationService ) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }
  
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  
  upload(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.uploadService.upload(this.currentFile).subscribe(
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
  }
  onSignOut(){
    this.authService.signOut();
  }


}