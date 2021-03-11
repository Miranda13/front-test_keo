import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-shot',
  templateUrl: './add-shot.component.html',
  styleUrls: ['./add-shot.component.scss']
})
export class AddShotComponent implements OnInit {

  @Output () validateForm: EventEmitter<any>;

  shotsForm: FormGroup;

  shots: any [] =[
    'Shot 1',
    'Shot 2',
    'Shot 3',
    'Shot 4',
    'Shot 5',
  ];
  validation: boolean = false; 
  constructor(private formBuilder: FormBuilder) {
    this.validateForm = new EventEmitter;
   }

  ngOnInit(): void {
    this.shotsForm = this.formBuilder.group({
      0: ['',Validators.required],
      1: ['',Validators.required],
      2: ['',Validators.required],
      3: ['',Validators.required],
      4: ['',Validators.required],
    })
    
  }

  submit(data: any) {
    if (this.shotsForm.invalid) {
      this.validation = true;
    } else {
      this.validation = false;
      this.validateForm.emit(data);

    }
  }

}
