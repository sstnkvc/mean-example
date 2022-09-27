import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  async onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }

    await this.authService.register(form.value.email, form.value.password);
    console.log(form.value);
  }
}
