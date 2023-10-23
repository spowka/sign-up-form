import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MaterialModule } from 'src/app/workspace/material/material.module';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService]
})
export class AuthModule { }
