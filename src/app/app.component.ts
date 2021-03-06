import { Component } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from './service/upload-file.service';
import { Item } from './model/Item';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'File-Upload-Save';
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  itemid=1;
  public item:Item;
  public itemName:string;
  constructor(private uploadService: UploadFileService){}
  getItemName(){
    /*const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '_File_Saved_Path');
    link.setAttribute('download', 'file_name.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove(); */

    this.uploadService.getItemName(this.itemid).subscribe(
      (res : Item) =>{
        this.item = res;
        alert('result returned - '+res);
        //this.itemName=res.name;
      },
      (err : Error) =>{
        console.log("error error error "+err);
      }
      
    );
    //alert("Item name is -- "+this.itemName);
  }
  change($event) {
    this.changeImage = true;
  }
  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }
  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
         alert('File Successfully Uploaded');
      }
      this.selectedFiles = undefined;
     }
    );
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}