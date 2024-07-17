// seller.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { Signup, Login } from '../../../../signup.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {

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
  id: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  userProfilePic: string = '';
  userType: string = 'user'; // Default to 'user'

  showLogin: boolean = false;
  loginError: string = '';

  constructor(
    private sellerService: SellerService,
    private router: Router,
    private authService: AuthService
  ) {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      
    }
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
    this.loginError = ''; // Clear login error on toggle
  }

  generateRandomId() {
    // Create a random ID using Math.random and Date.now for more uniqueness
    return 'id-' + Math.random().toString(36).substr(2, 5);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.showLogin) {
        const loginData: Login = {
          email: this.email,
          password: this.password
        };

        this.sellerService.userLogin(loginData).subscribe(response => {
          if (response && response.length > 0) {
            const user = response[0];
            if (user.password === this.password && user.email === this.email) {
              console.log('Login successful');
              localStorage.setItem(user.userType === 'seller' ? 'sellerData' : 'userData', JSON.stringify(user));
              localStorage.setItem('isLoggedIn', 'true');
              this.authService.login(user.userType, user.name);
              this.router.navigate([user.userType === 'seller' ? '/seller-home' : '/']);
            } else {
              console.log('Invalid login credentials');
              this.loginError = 'Invalid email or password';
            }
          } else {
            console.log('Invalid login credentials');
            this.loginError = 'Invalid email or password';
          }
        });
      } else {
        const signupData: Signup = {
          id: this.generateRandomId(), // Generate a random ID
          name: this.name,
          email: this.email,
          password: this.password,
          profile: this.userProfilePic,
          userType: this.userType
        };

        this.sellerService.sellerSignup(signupData).subscribe(response => {
          console.log('Signup successful', response);

          localStorage.setItem(this.userType === 'seller' ? 'sellerData' : 'userData', JSON.stringify(signupData));
          localStorage.setItem('isLoggedIn', 'true');

          this.authService.login(this.userType, this.name);
          this.router.navigate([this.userType === 'seller' ? '/seller-home' : '/']);
          form.resetForm();
        });
      }
    }
  }
}
