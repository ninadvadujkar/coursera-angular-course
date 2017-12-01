import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _dialog: MatDialog) { }

  ngOnInit() {
  }

  openLoginForm() {
    this._dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }
}
