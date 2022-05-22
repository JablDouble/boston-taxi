import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/shared/interfaces';
import { ProfileService } from '../../../shared/services/profile.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  account: any;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getUserBySessionToken().subscribe((account: Profile) => {
      this.account = account;
    });
  }

}
