import { Component, Input } from '@angular/core';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatMenuModule} from '@angular/material/menu';
import{MatIconModule} from '@angular/material/icon';
import{MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/Auth/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'tailorapp-header',
  standalone: true,
  imports: [MatToolbarModule,MatMenuModule,
    MatIconModule,MatButtonModule,RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService:AuthService, private router:Router,public dialog: MatDialog){}

  logout(){
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
      }
    });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  @Input() showAuthOptions: boolean = true;

}
