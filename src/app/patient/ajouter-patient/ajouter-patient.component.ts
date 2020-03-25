import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-patient',
  templateUrl: './ajouter-patient.component.html',
  styleUrls: ['./ajouter-patient.component.css']
})
export class AjouterPatientComponent implements OnInit {
  returnUrl: string;
  registerForm:FormGroup;
  
  constructor(private formBuilder:FormBuilder,private service:RegisterService,private toastr:ToastrService,private router:Router) { 
    let registerFormControls = {
      name:new FormControl('',[
        Validators.minLength(3),
        Validators.required,
      ]),
      username:new FormControl('',[
        Validators.required,
        Validators.pattern('[a-zA-z][a-zA-z]+')
      ]),
      email:new FormControl('',[
        Validators.email,
        Validators.required,
      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[a-zA-z0-9]+'),
      ])
    };
    this.registerForm=formBuilder.group(registerFormControls);
  }

  ngOnInit() {        
  }

  get name(){
    return this.registerForm.get('name');
  }

  get username(){
    return this.registerForm.get('username');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }
  get f() { return this.registerForm.controls; }


  
  register(){
   //this.f.username.value

    let data = this.f.value;
    console.log(data);
    
    this.service.register(data).subscribe(
      res=>{
        console.log(res);
       this.toastr.success('Patient registred succesfully'),
        this.router.navigate(['/home']);
      },
      error=>{
       console.log(error);
        this.toastr.error(error.error);
      }
    );
  }
}
