import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Profile } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit {
  account: any;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUserBySessionToken().subscribe((account: Profile) => {
      this.account = account;
    });
  }
}