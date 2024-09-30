import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent 
{
  loginForm!:FormGroup;
   
   constructor(private fb:FormBuilder,private authservice: AuthService, private router:Router){}  
   ngOnInit(): void 
           {
             this.loginForm = this.fb.group({
               email: ['', [Validators.required, Validators.email]],
               password: ['', Validators.required],
               rememberme:[false]
             });
           }

   onLogin() 
   {
    console.log(this.loginForm.value,"valuessssss");
            
    const logindata=this.loginForm.value;
    this.authservice.login(logindata).subscribe({
     next: (response) => {
       console.log('Login successful:', response);
       // Navigate to mainpage only if login is successful
       this.router.navigate(['/mainpage']);
     },
     error: (error) => {
       if (error.status === 404) {
         console.error('API not found (404)');
       } else if (error.status === 429) {
         console.error('Too many requests (429). Try again later.');
       } else {
         console.error('Login error:', error);
       }
     }
   });
   }



}
