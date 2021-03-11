import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  credentials: FormGroup;

  constructor(public auth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private route: Router) { }

  ngOnInit(): void {
    this.credentials = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
    });
  }

  message(title: any, message: any, icon: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }

  goToLogin() {
    this.route.navigateByUrl('/login');
  }

  create(data: any){
    this.auth.createUserWithEmailAndPassword(data.email, data.password)
    .then((user)=>{
      this.message('User created','Successful!', 'success');
      this.goToLogin();
    })
    .catch((error)=>{
      this.message( error.code, error.message, 'error');
    })
  }

}
