import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  constructor(private _fb: FormBuilder ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.feedbackForm = this._fb.group({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: [{value: 'None', disabled: true}],
      message: ''
    });
  }

  onSubmit(): void {
    this.feedback = this.feedbackForm.value;
    this.feedbackForm.reset();
    console.log(this.feedback);
  }

  onToggle(e): void {
    if(e.checked) {
      this.feedbackForm.controls['contacttype'].enable();
    } else {
      this.feedbackForm.controls['contacttype'].disable();
    }
  }
  

}
