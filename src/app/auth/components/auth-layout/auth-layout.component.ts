import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoaderService } from 'src/app/common/services/loader.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor(public authService: AuthService, public loadingService: LoaderService) { }

  ngOnInit(): void {
  }

}
