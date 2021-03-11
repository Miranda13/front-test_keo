import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  participants: any []= [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection('participants').valueChanges()
    .subscribe((participants)=>{
      this.participants = <any[]>participants;
    });
  }

}
