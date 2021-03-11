import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  dataParticipant: FormGroup;

  spots: any[]=[
    'Spot 1',
    'Spot 2',
    'Spot 3',
    'Spot 4',
    'Spot 5',
  ];

  playerShots: any[]=[];
    
  constructor(public auth: AngularFireAuth,
    private route: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dataParticipant = this.formBuilder.group({
      name: ['', 
      [ Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^[A-Z]+$/i)
      ]
    ]
    })
    this.changes();
  }

  changes() {
    this.dataParticipant.statusChanges.subscribe((status)=>{
      console.log(status);
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
  }

  goForward(stepper: MatStepper){
    stepper.next();
  }

  logout() {
    this.auth.signOut();
    this.route.navigateByUrl('/login');
  }

}
