import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { SignupComponent } from '../components/signup/signup.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent]
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.vcr.createComponent(SignupComponent);
  }
  title = 'tailorapp';
  @ViewChild('signup',{read:ViewContainerRef}) vcr!:ViewContainerRef;
}
