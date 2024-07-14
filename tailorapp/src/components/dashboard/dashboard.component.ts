import { Component, Input } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { HeaderComponent } from "../header/header.component";
import {Router, RouterOutlet } from '@angular/router';
import { AppComponent } from '../../app/app.component';
import { AuthService } from '../../service/Auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../card/card.component";
@Component({
    selector: 'tailorapp-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [MatSidenavModule, MatListModule, RouterOutlet, MatToolbarModule,
    MatMenuModule, MatIconModule, MatButtonModule, CommonModule,
    HeaderComponent, AppComponent, MatIconModule, HeaderComponent, CardComponent]
})
export class DashboardComponent {

  constructor(private authService:AuthService, private route:Router){}

  @Input() showAuthOptions: boolean = false;

  showContent:boolean = false;
  cardOptions = ['Individual account', 'Family account'];
  logout(){
    this.authService.logout()
  }

  
}
