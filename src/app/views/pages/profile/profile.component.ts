import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../../../models/User'
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  public user: UserProfile | null = null;

  constructor(private authService: AuthService) {
    this.getAuthUser();
  }

  public getAuthUser(): void {
    const user = this.authService.getLoggedUser();
    this.authService.getUserProfile(user.id.toString()).subscribe({
      next: (userProfile: UserProfile | null) => {
        this.user = userProfile;
      }
    });
  }

  public save() {
    this.authService.updateUserProfile(this.user!)
      .subscribe({
        next: _ => {
          Swal.fire({
            icon: 'success',
            title: 'Perfil Actualizado',
            text: 'Se ha actualizado exitosamente tu perfil!'
          });
        }
      });
  }

}
