import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Address } from 'src/app/shared/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.mapService.getHomePosition().subscribe((address) => {
    //   console.log(address);
    // });
  }

  setHomeAddress(address: Address) {
    console.log(address);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'login']);
  }
}
