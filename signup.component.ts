import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent 
{

  signupForm!: FormGroup;
  constructor(private fb:FormBuilder,private authservice:AuthService,private router:Router) {}
  ngOnInit(): void 
           {
             this.signupForm = this.fb.group({
               email: ['', [Validators.required, Validators.email]],
               password: ['',[ Validators.required,Validators.minLength(4)]],
               name:['',Validators.required]
             });
           }
  onSignup() 
  {
    const signupdata=this.signupForm.value;
      this.authservice.signup(signupdata).subscribe(
        response=>{
         console.log("Sign-Up successful",response);
         this.router.navigate(['/login']);  
      }, 
      error=>{
       console.error("Sign-Up Error",error)
       alert('Email ID already exist')
      });
  }

}
