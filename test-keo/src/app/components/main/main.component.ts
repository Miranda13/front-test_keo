import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { sortAndDeduplicateDiagnostics } from 'typescript';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  dataParticipant: FormGroup;

  validation: boolean = false;

  spots: any[]=[
    'Spot 1',
    'Spot 2',
    'Spot 3',
    'Spot 4',
    'Spot 5',
  ];

  scores: any[]=[];
  participants: any []= [];
  playerShots: any[]=[];
  finalScore = 0;
    
  constructor(public auth: AngularFireAuth,
    private route: Router,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,) {
      this.dataParticipant = this.formBuilder.group({
        name: ['', 
        [ Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[A-Z ]+$/i)
        ]
      ]
      })
     }

  ngOnInit(): void {
    this.firestore.collection('participants').valueChanges()
    .subscribe((participants)=>{
      this.participants = <any[]>participants;
    });
    this.changes();
  }

  changes() {
    this.dataParticipant.statusChanges.subscribe((status)=>{
      if(status=='INVALID'){
        this.validation = true;
      } else {
        this.validation = false;
      }
    })
  }

  informationShots(data: any, stepper: MatStepper, index: any)  {
    let score = 0;
    let shots: any;
    for(let i=0; i<4; i++){
      if (shots==undefined) {
        shots= data[i];
      } else{
        shots=shots+data[i];
      }
      if (data[i]==1) {
        score = score + 1;
      } 
    };
    if (data[4]==1){
      score = score + 2;
    }
    shots=shots+data[4];
    this.playerShots[index+1]=shots;
    this.goForward(stepper);
    this.scores[index] = score;
    if(index==4){
      this.getFinalScore();
    }
    
  }

  getFinalScore() {
    this.finalScore = 0;
    for(let i=0; i<5; i++){
      this.finalScore = this.finalScore + this.scores[i];
    }
  }

  submit (data: any, stepper: MatStepper) {
    if (this.dataParticipant.valid) {
      this.playerShots[0]=data.name;
      this.goForward(stepper);
    }
  }

  goForward(stepper: MatStepper){
    stepper.next();
  }

  logout() {
    this.auth.signOut();
    this.route.navigateByUrl('/login');
  }

  message(title: any, message: any, icon: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }

  save() {
    let validar = this.validarNombre();
    if (validar){
      this.firestore.collection('participants').doc().set({
        name: this.playerShots[0],
        score: this.finalScore,
      });
      this.message('Participant created','Successful!', 'success');
    } else {
      this.message('Error','This name already exists. Try change name', 'error');
    }
  }

  validarNombre (){
    for (let i=0; i < this.participants.length; i++){
      if(this.playerShots[0] == this.participants[i].name) {
        return false;
      }
    }
    return true;
  }
}
