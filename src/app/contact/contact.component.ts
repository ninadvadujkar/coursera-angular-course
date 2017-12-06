import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut } from '../animations/app.animation';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'Firstname is required',
      'minlength': 'Firstname must be atleast 2 characters long',
      'maxlength': 'Firstname cannot be more than 25 characters',
    },
    'lastname': {
      'required': 'Lastname is required',
      'minlength': 'Lastname must be atleast 2 characters long',
      'maxlength': 'Lastname cannot be more than 25 characters',
    },
    'telnum': {
      'required': 'Telnum is required',
      'pattern': 'Telnum must contain only digits',
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email not in valid format',
    }
  };

  constructor(private _fb: FormBuilder ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.feedbackForm = this._fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: [0, [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: [{value: 'None', disabled: true}],
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  
    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if(!this.feedbackForm) return;
    const form = this.feedbackForm;

    for(let field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for(let key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit(): void {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onToggle(e): void {
    e.checked ? this.feedbackForm.controls['contacttype'].enable() : this.feedbackForm.controls['contacttype'].disable();
  }
  

}
