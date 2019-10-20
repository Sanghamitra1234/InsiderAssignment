import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators'
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { AppService } from './app.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  image="";
  noFileError="";
  imgURL: any;
  errorMessage="";
  newImagePaths=[];
  showSpinner=false;

  constructor(private http:HttpClient,private service:AppService,
    private spinnerService: Ng4LoadingSpinnerService){}

  selectImage(event){
    //console.log(event);
    this.noFileError="";
    this.errorMessage="";
        if(event.target.files.length > 0){
        let file = event.target.files[0];
        let mimeType=file.type;
          //To get the type of file getting uploaded
          if (mimeType.match(/image\/*/) == null) {
            this.noFileError = "Please select image only";
            this.imgURL=null;
            return;
          }else{
            //To get a preview of the image before upload
            this.noFileError="";
                var reader = new FileReader();
                reader.readAsDataURL(file); 
                reader.onload = (_event) => { 
                this.imgURL = reader.result;
                this.image = file;
              }
        
           }
    
        }
    }

    onSubmit(){
      this.showSpinner=true;
      if(this.errorMessage==null && this.noFileError==null){
        this.spinnerService.hide();
      }
      if(this.showSpinner){
        this.spinnerService.show();
      }
      let formData = new FormData();
      formData.append('image', this.image);
      this.errorMessage="";
      this.service.uploadImages(formData).subscribe(data=>{
        if(!data.file){
          this.noFileError="";
          this.handleError(data)
          
        }else{
          //this.newImagePaths=data.file;
          this.newImagePaths= data.file;
          if(this.newImagePaths.length>0){
            //this.showSpinner=false;
          }
          console.log("answer",this.newImagePaths);
         // this.router
          
        }
      })
    }

    private handleError(err: HttpErrorResponse) {
      //console.log(err);
      if(err.error){
        this.errorMessage=err.error;
      }else{
        this.errorMessage="Server Error !!!";
      }
  }
}


