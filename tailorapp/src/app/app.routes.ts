import { Routes} from '@angular/router';
import { SignupComponent } from '../components/signin/signin.component';
import { RegisterComponent } from '../components/register/register.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent,children:[
        {
            path:'signin',component:SignupComponent},
           {path:'signup', component:RegisterComponent}
    ]},
    {path:'dashboard', component:DashboardComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }

];