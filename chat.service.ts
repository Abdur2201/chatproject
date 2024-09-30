import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService 
{
    // private socket: WebSocket;
    private apiUrl='http://localhost:3000/webhook'
    constructor(private http:HttpClient) {}
    sendMessage(message: string): Observable<{ botMessage:string}> {
        return this.http.post<{ botMessage: string }>(this.apiUrl, { userMessage: message });
      }
  }
    // // Method to send a message to the WebSocket server
    // sendMessage(message: string): void 
    // {
    //     if (this.socket.readyState === WebSocket.OPEN) {
    //         this.socket.send(message);
    //     } else {
    //         console.error('WebSocket is not open. Ready state:', this.socket.readyState);
    //     }
    // }

    // // Method to receive messages from the WebSocket server
    // onMessage(callback: (message: string) => void): void 
    // {
    //     this.socket.onmessage = (event: MessageEvent) => {
    //         callback(event.data); // Passing the message data to the callback function
    //     };

    //     this.socket.onerror = (error) => {
    //         console.error('WebSocket error:', error);
    //     };

    //     this.socket.onclose = () => {
    //         console.log('WebSocket connection closed');
    //     };
    // }

    // // Optional: Close the WebSocket connection when done
    // closeConnection(): void 
    // {
    //     if (this.socket) {
    //         this.socket.close();
    //     }
    // }

