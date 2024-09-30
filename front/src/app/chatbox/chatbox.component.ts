import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { response } from 'express';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent 
{
 
  chatForm!: FormGroup;
    
  messages:{text: string,type:'user'|'bot'}[]=[]; 
  constructor(private fb:FormBuilder,private chatservice:ChatService)
  {
    this.chatForm=this.fb.group({
      usermessage:['',Validators.required]
    });
  }
  

  // ngOnInit(): void
  // {
  //   this.chatservice.onMessage((botmessage:string)=>{
  //     this.messages.push({ text: botmessage,type:'bot'});
  //   });
  // }
  sendMessage() 
  {
    if (this.chatForm.valid) 
      {
        const usermessage = this.chatForm.get('usermessage')?.value;
        this.messages.push({ text: usermessage, type: 'user' });
        this.chatForm.reset();
  
        this.chatservice.sendMessage(usermessage).subscribe(response=>{
          this.messages.push({text:response.botMessage,type:'bot'});
        },error=>{
          console.error('error sending message',error)
          this.messages.push({ text: 'An error occurred while sending the message.', type: 'bot' });
        });
      }      
  }

}
