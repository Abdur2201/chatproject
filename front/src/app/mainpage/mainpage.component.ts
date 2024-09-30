import { Component } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent 
{  
  isChatboxOpen = false;  
  openChatbot() 
  {
    this.isChatboxOpen=!this.isChatboxOpen;
    console.log('Chatbot starts!')
  }
}
