import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './shared/services/profile.service';
import { Profile } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }
}
