import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import {authroutes} from './authroutes.js'; // Note the .js extension for ES modules
import dotenv from 'dotenv';
import { WebhookClient } from 'dialogflow-fulfillment';

dotenv.config();
const app=express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("Welcome to FSL Chatbot")
})
mongoose.connect('mongodb://localhost:27017/chatbotUsers',{
    
}).then(()=>{
    console.log('Connected to MongoDB');
}).catch((error)=>{0
    console.log('Error connecting',error)
}); 

app.post('/webhook', (req, res) => {

    const agent = new WebhookClient({ request: req, response: res });
    res.send('Webhook endpoint is ready. Use POST to send data.');
    console.log("webhook received",req.body)

  // Function to handle Track Service intent
  function handleTrackService(agent) {
      const trackingNumber = agent.parameters.tracking_number; // Adjust parameter name to match Dialogflow
      agent.add(`Your cargo with tracking number ${trackingNumber} is in transit.`);
  }

  // Function to handle Download Receipt intent
  function handleDownloadReceipt(agent) {
      const orderNumber = agent.parameters.order_number; // Adjust parameter name to match Dialogflow
      agent.add(`Here is the download link for order number ${orderNumber}: https://your-domain.com/receipt/${orderNumber}`);
  }

  // Function to handle Calculate Cost intent
  function handleCalculateCost(agent) {
      const source = agent.parameters['source-location'];
      const destination = agent.parameters['destination-location'];
      const weight = agent.parameters['weight'];

      // Simple calculation logic for demo
      const estimatedCost = calculateShippingCost(source, destination, weight);
      agent.add(`The estimated cost to ship from ${source} to ${destination} for a weight of ${weight} kg is $${estimatedCost}.`);
  }

  // Function to handle Other Queries intent
  function handleOtherQueries(agent) {
      const query = agent.parameters.other_query; // Adjust parameter name to match Dialogflow
      agent.add(`For "${query}", please contact our customer support for further assistance.`);
  }

  function calculateShippingCost(source, destination, weight) {
      const baseRate = 5;
      const distanceFactor = 2;
      const weightFactor = 1.5;

      const distanceCost = baseRate * distanceFactor;  
      const weightCost = weight * weightFactor;

      return distanceCost + weightCost;
  }

  // Map Dialogflow intent names 
  let intentMap = new Map();
  intentMap.set('Trackservice', handleTrackService);  // intent name in Dialogflow
  intentMap.set('DownloadReceipt', handleDownloadReceipt);
  intentMap.set('calculation_data', handleCalculateCost);
  intentMap.set('Others', handleOtherQueries);

  // Handle the request from Dialogflow
  agent.handleRequest(intentMap);
});

//routing to authroutes
app.use('/auth',authroutes);

//starting port
const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});












// const wss=new Websocket.Server({port:8080})
// wss.on('connection',(ws)=>{
//     ws.on('message',(message)=>{
//         console.log('Received: %s',message);
        
//         ws.send('Chat response: '+processQuery(message));
//     });
// });

//   function processQuery(query)
//   {
//     if(query.includes('status'))
//     {
//         return 'Your service is being process'
//     }
//     else if (query.includes('help')) 
//     {
//         return 'How can I assist you today?';
//     } 
//     else 
//     {
//         return 'I am not sure how to answer that. Can you clarify?';
//     }
//   }


//imports
// const express=require('express');
// const mongoose=require('mongoose');
// const bodyparser=require('body-parser');
// const cors=require('cors');
// const Websocket=require('ws')
// const authroutes=require('C:/Users/Intern- newage/Desktop/chatbot/back/authroutes.js');
// const { Configuration,OpenAIAPI}=require('openai')
// require('dotenv').config();
// import OpenAI from 'openai';







// console.log("Using API Key:", apiKey);
// const openai=new OpenAI({
//     apiKey:apiKey
// });

// app.post('/chatbot',async(req,res)=>{
//     const userMessage=req.body.message
//   try 
//   {
//     const response = await openai.chat.completions.create({
//       model: 'dall-e-3',  
//       prompt: userMessage,
//       max_tokens: 100,
//     });
//     const botMessage = response.data.choices[0].text.trim();
//     res.json({ botMessage });
//   } 
//   catch (error) {
//     console.error('Error with OpenAI API request:', error);
//     res.status(500).send('Error processing your request.');
//   }
// });
