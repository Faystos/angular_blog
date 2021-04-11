import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterContentChecked {
   auth: boolean;

  constructor(
    private authServise: AuthService,
    private router: Router,
  ) {}

  ngAfterContentChecked(): void {
    this.auth = this.authServise.isAuthEnticated();
  }

  onLogout = (evt:Event) => {
    evt.preventDefault();
    this.authServise.logout();
    this.router.navigate(['/admin', 'login']);
  }

}
