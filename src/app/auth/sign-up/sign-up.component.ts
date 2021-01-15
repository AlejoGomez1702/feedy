import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit 
{
  isLoged = false;

  // Password field
  public isShowPassword: boolean = false;
  public passwordToggleIcon: string = 'eye-outline';
  //Repeat Password Field
  public isShowPassword2: boolean = false;
  public passwordToggleIcon2: string = 'eye-outline';


  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  signIn()
  { 
    this.router.navigate(['/auth']);
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

  showPassword2()
  {
    this.isShowPassword2 = !this.isShowPassword2;
    if(this.passwordToggleIcon2 == 'eye-outline')
    {
      this.passwordToggleIcon2 = 'eye-off-outline';
    }
    else
    {
      this.passwordToggleIcon2 = 'eye-outline';
    }
  }

}
