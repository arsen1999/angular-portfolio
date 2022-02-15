import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../common/services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
  }

  public onLogout(): void {
    this.authService.logOut();
    this.router.navigate(['signin']);
  }

}
