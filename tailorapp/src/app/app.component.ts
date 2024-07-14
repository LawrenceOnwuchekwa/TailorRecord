import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { HomeComponent } from "../components/home/home.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/Auth/auth.service';
import { AuthInterceptor } from '../service/Auth/authInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_SERVICE_CONFIG, APP_CONFIG } from './AppConfig/appconfig.service';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, DashboardComponent, HomeComponent,CommonModule],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      { provide: APP_SERVICE_CONFIG, useValue: APP_CONFIG },
      AuthService
    ],
})
export class AppComponent {

  showHomeHeader = true;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHomeHeader = !event.url.includes('dashboard');
      }
    });
  }

  ngOnInit() {
    // Check the initial authentication status
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
    // Subscribe to authentication status changes
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    });
    
}
}
