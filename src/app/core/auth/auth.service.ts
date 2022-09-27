import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IAuthModel } from 'src/app/model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  async register(email: string, pw: string): Promise<void> {
    const authData: IAuthModel = {
      email,
      password: pw,
    };

    const url = 'http://localhost:3000/api/auth/register';
    const response = await firstValueFrom(this.httpClient.post(url, authData));
    console.log(response);
  }

  async login(email: string, pw: string) {
    const authData: IAuthModel = {
      email,
      password: pw,
    };

    const url = 'http://localhost:3000/api/auth/login';

    const response = await firstValueFrom(this.httpClient.post(url, authData));
    console.log(response);
    return response;
  }
}
