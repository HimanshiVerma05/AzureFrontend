import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item } from '../model/Item';
@Injectable({
providedIn: 'root'})
export class UploadFileService {
  constructor(private https: HttpClient) { }
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    
    const newRequest = new HttpRequest('POST', 'https://backendwebapphv.azurewebsites.net/savefile', data, {
    reportProgress: true,
    responseType: 'text'
    });
    return this.https.request(newRequest);
}
   getItemName(id : number) {
     //here iam trying to hit my web service in order to get user with a particular id .
     //const url =  "http://localhost:8080/getItem/"+id;
     const url = "https://backendwebapphv.azurewebsites.net/getItem/"+id;
     return this.https.get<Item>(url).pipe(
       catchError((err)=> { return of(err) 
       })
     );
}
}