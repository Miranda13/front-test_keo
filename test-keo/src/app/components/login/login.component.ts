import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;

  constructor(private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    public auth: AngularFireAuth,
    private route: Router) { }

    ngOnInit(): void {
      this.credentials = this.formBuilder.group({
        email: ['',Validators.required],
        password: ['',Validators.required],
      });
    }

    message( error: any, message: any) {
      Swal.fire({
        icon: 'error',
        title: error,
        text: message,
      })
    }
  
    login(data: any) {
      this.auth.signInWithEmailAndPassword( data.email, data.password)
      .then( (user)=>{
        this.goToMain();
      })
      .catch( (error)=>{
        this.message( error.code, error.message);
      });
    }

    loginGoogle() {
      
    }
  
    goToMain() {
      this.route.navigateByUrl('/main');
    }

    goToRegister() {
      this.route.navigateByUrl('/register');
    }

}
