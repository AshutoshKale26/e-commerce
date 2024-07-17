import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../../services/seller.service';
import { Signup } from '../../../../signup.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string = '';
  email: string = '';
  userProfilePic: string = 'https://via.placeholder.com/100';
  isEditing: boolean = false;
  id: string | null = null;
  password: string = '';
  showPassword: boolean = false;
  userType: string = '';

  constructor(private router: Router, private sellerService: SellerService,private authService: AuthService) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    const sellerData = localStorage.getItem('sellerData');
    const userData = localStorage.getItem('userData');
    if (sellerData) {
      const parsedData = JSON.parse(sellerData);
      this.id = parsedData.id;
      this.userType = parsedData.userType;
      this.name = parsedData.name || '';
      this.email = parsedData.email || '';
      this.password = parsedData.password || '';
      this.userProfilePic = parsedData.profile || 'https://via.placeholder.com/100';
    } else if (userData) {
      const parsedData = JSON.parse(userData);
      this.id = parsedData.id;
      this.userType = parsedData.userType;
      this.name = parsedData.name || '';
      this.email = parsedData.email || '';
      this.password = parsedData.password || '';
      this.userProfilePic = parsedData.profile || 'https://via.placeholder.com/100';
    } else {
      this.router.navigate(['/login']);
    }
  }

  editProfile() {
    this.isEditing = true;
  }

  saveProfile() {
    if (this.id !== null) {
      const updatedProfile: Signup = {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        profile: this.userProfilePic,
        userType: this.userType
      };

      this.sellerService.updateProfile(updatedProfile).subscribe(response => {
        if (response) {
          if (this.userType === 'seller') {
            localStorage.setItem('sellerData', JSON.stringify(updatedProfile));
          } else {
            localStorage.setItem('userData', JSON.stringify(updatedProfile));
          }
          this.isEditing = false;
        } else {
          console.error('Error updating profile');
        }
      }, error => {
        console.error('Error updating profile', error);
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.checkLogin();  // Reset to original values
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // logout() {
  //   localStorage.removeItem('isLoggedIn');
  //   localStorage.removeItem('sellerData');
  //   localStorage.removeItem('userData');
  //   this.router.navigate(['/']);
  // }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userProfilePic = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
