import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLoged = true;
  public isSubmitted: boolean = false;

  // Password field
  public isShowPassword: boolean = false;
  public passwordToggleIcon: string = 'eye-outline';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alerCtrl: AlertController
  ) { 
    if (this.authService.userAuthenticated) {
      this.router.navigateByUrl('/auth/pick-location');
    }
  }

  ngOnInit() {
  }

  onSwitch() {
    this.isLoged = !this.isLoged;
  }

  signUp()
  {
    console.log('LLendo hacia registro');
    this.router.navigate(['/auth/signup']);
  }

  onSubmit(form: NgForm) {
    this.isSubmitted = true;
    if (!form.valid) {
      return;
    }

    if (this.isLoged) {
      this.isLoading = true;

      this.authService.login(form.value.email, form.value.password).then(resp => {
        if (resp) {
          this.router.navigateByUrl('/auth/pick-location');
        } else {
          this.isLoading = false;
          
          this.alerCtrl.create({
            header: 'Authentication',
            message: 'Incorrect Email or Password',
            buttons: ['Okay']
          }).then(show => {
            show.present();
          });
          
          this.isSubmitted = false;
          form.resetForm();
          this.isLoading=false
        }
      });

      // this.loadingCtrl.create({ keyboardClose: true, message: 'Logging in..' })
      //   .then(loadingEl => {
      //     loadingEl.present();
      //     setTimeout(() => {
      //       this.isLoading = false;
      //       loadingEl.dismiss();
      //       this.router.navigateByUrl('/auth/pick-location');
      //     }, 1500);
      //   });
    }
    else {
      //send request to signup server
    }
  }

  showPassword()
  {
    this.isShowPassword = !this.isShowPassword;
    if(this.passwordToggleIcon == 'eye-outline')
    {
      this.passwordToggleIcon = 'eye-off-outline';
    }
    else
    {
      this.passwordToggleIcon = 'eye-outline';
    }
  }


}
