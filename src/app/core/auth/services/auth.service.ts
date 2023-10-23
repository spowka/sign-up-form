import { Injectable } from '@angular/core';
import { UserData } from '../models/auth-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(userData: UserData) {
    return this.http.post(`${environment.apiUrl}/users`, userData)
  }
}
