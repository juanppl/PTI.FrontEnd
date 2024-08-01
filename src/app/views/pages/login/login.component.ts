import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { AuthService } from '../../../services/auth.service';
import { UserCredentials } from 'src/app/models/Auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent, 
    RowComponent, 
    ColComponent, 
    CardGroupComponent, 
    TextColorDirective, 
    CardComponent, 
    CardBodyComponent, 
    FormDirective, 
    InputGroupComponent, 
    InputGroupTextDirective, 
    IconDirective, 
    FormControlDirective, 
    ButtonDirective, 
    NgStyle,
    FormsModule,
    RouterModule
  ]
})
export class LoginComponent {

  public user: UserCredentials;

  constructor(private authService: AuthService, private router: Router) {
    this.user = {
      username: '',
      password: ''
    }
  }

  public logInUser(): void {
    this.authService.logIn(this.user.username, this.user.password).subscribe({
      next: (data) => {
        if (data) {
          this.authService.setLoggedInUser(data);
          this.router.navigateByUrl(`/dashboard`);
        }
      },
      error: (error) => {
        console.log(error);
      }
    }
    );
  }

}
