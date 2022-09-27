import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  async onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const result = await this.authService.login(
      form.value.email,
      form.value.password
    );
    console.log(result);
  }
}
