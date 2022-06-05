import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/common/interfaces';
import { ProfileService } from '../../../common/services/profile.service';

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
