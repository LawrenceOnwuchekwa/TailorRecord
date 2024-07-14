import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'tailorapp-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderComponent,RouterModule]
})
export class HomeComponent {
  @Input() showAuthOptions: boolean = true;
}
