import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public url="http://localhost:9097/rest/api/";

  constructor(private http:HttpClient) { }
  addPatient(patient:Object,token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.post<any>(this.url+"addPatient",patient,httpOptions);
  }
}