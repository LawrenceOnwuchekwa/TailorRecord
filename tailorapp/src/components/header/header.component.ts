import { Component } from '@angular/core';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatMenuModule} from '@angular/material/menu';
import{MatIconModule} from '@angular/material/icon';
import{MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'tailorapp-header',
  standalone: true,
  imports: [MatToolbarModule,MatMenuModule,
    MatIconModule,MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
