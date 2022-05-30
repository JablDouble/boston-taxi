import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/common/services/loader.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor(public loadingService: LoaderService) { }

  ngOnInit(): void {
  }

}
