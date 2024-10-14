import axios from "axios"; 

export async function sendMessageToPythonChatbot(userMessage) {
    try {
      const response = await axios.post('http://localhost:8000/ask', {
        question: userMessage
      });
      return response.data.response;
    } catch (error) {
      console.error("Error communicating with Python API:", error);
      return "Sorry, I'm having trouble answering your question.";
    }
  }