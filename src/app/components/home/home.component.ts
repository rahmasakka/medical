import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isDoctor:boolean;
  isPatient:boolean;

  constructor() {}

  ngOnInit() {
    this.token;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.token);
    let roles = decodedToken.roles;
    
    let username = decodedToken.sub;
    roles = roles.replace('[','');
    roles = roles.replace(']',''); //
    roles = roles.split(', '); 
    
    this.isDoctor=false;
    this.isPatient=false;

    for (let i =0; i < roles.length; i++){
      if(roles[i] == "ROLE_DOCTOR")
      { this.isDoctor=true;}

      if (roles[i] == "ROLE_PATIENT")
        {this.isPatient=true;}
      }
  }

  get token(){
    let token = localStorage.getItem("Authorization");
    return token;
  }
}