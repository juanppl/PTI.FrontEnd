import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { CreateUser } from 'src/app/models/Auth';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    FormsModule,
    RouterModule
  ]
})
export class RegisterComponent {

  public user: CreateUser;
  public password = '';
  public passwordVerification = '';

  constructor(private authService: AuthService, private router: Router) {
    this.user = {
      username: '',
      email: '',
      password: ''
    };
  }

  public createUser(): void {
    this.authService.createUser(this.user).subscribe({
      next: (_) => {
        this.router.navigateByUrl(`/login`);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public verifyAndSetPassword(): void {
    if (this.password === this.passwordVerification) {
      this.user.password = this.passwordVerification;
    }
  }

}
