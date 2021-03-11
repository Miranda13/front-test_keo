import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  constructor(public auth: AngularFireAuth,
    private route: Router,) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.auth.signOut();
    this.route.navigateByUrl('/login');
  }

}
