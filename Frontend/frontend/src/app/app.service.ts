import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  uploadImages(imageData):Observable<any>{
    //console.log("inside front end service", imageData);
    return this.http.post<any>('http://localhost:3000/upload',imageData);
  }
}
