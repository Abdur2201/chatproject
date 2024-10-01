import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authroutes } from './authroutes.js';
import dotenv from 'dotenv';
import { WebhookClient } from 'dialogflow-fulfillment';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect('mongodb://localhost:27017/chatbotUsers', {

})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

// Basic route for testing
app.get('/', (req, res) => {
  res.send("Welcome to FSL Chatbot");
});

// Webhook endpoint for Dialogflow
app.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  console.log("Webhook received", req.body);

  // Intent handlers
  function handleTrackService(agent) {
    const trackingNumber = agent.parameters.trackingId; // Parameter name from Dialogflow
    agent.add(`Your cargo with tracking number ${trackingNumber} is in transit.`);
  }

  function handleDownloadReceipt(agent) {
    const orderNumber = agent.parameters.trackingId; // Parameter name from Dialogflow
    agent.add(`Here is the download link for order number ${orderNumber}: https://your-domain.com/receipt/${orderNumber}`);
  }

  function handleCalculateCost(agent) {
    const source = agent.parameters['Sourcename'];
    const destination = agent.parameters['Destname'];
    const weight = 75

    // Simple calculation logic for demo
    const estimatedCost = calculateShippingCost(source, destination, weight);
    agent.add(`The estimated cost to ship from ${source} to ${destination} for a weight of ${weight} kg is $${estimatedCost}.`);
  }

  function handleOtherQueries(agent) {
    const query = agent.parameters.UserId; // Parameter name from Dialogflow
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

  // Map Dialogflow intent names to the handlers
  let intentMap = new Map();
  intentMap.set('Trackservice', handleTrackService);
  intentMap.set('DownloadReceipt', handleDownloadReceipt);
  intentMap.set('calculation_data', handleCalculateCost);
  intentMap.set('Others', handleOtherQueries);

  // Handle the request using the intent map
  agent.handleRequest(intentMap);
});

// Routing to authroutes
app.use('/auth', authroutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
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











// try {
//     const responses = await sessionClient.detectIntent(request);
//     const botReply = responses[0].queryResult.fulfillmentText;

//     res.status(200).json({ botMessage: botReply });
//   } catch (error) {
//     console.error('Error in Dialogflow:', error);
//     res.status(500).json({ message: 'An error occurred while processing your message.' });
//   }
//     try {
//         const userMessage = req.body.userMessage;
//         if (!userMessage) {
//           return res.status(400).json({ botMessage: 'User message is missing' });
//         }
        
//         // Replace this logic with your Dialogflow or chatbot response logic.
//         const botReply = `You said: ${userMessage}`;
//         res.status(200).json({ botMessage: botReply });
//       } catch (error) {
//         console.error('Error in /webhook:', error);
//         res.status(500).json({ message: 'An error occurred on the server.' });
//       }