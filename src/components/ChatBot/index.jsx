'use client'

import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { database } from "../../firebase"; 
import { ref, get } from "firebase/database";
import { marked } from 'marked'; // Import the marked library
import './index.scss';  // Import the SCSS file

const ChatHistory = ({ chatHistory }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="chat-history">
      {chatHistory.map((entry, index) => (
        <div
          key={index}
          className={`message ${entry.type === "user" ? "user" : "bot"}`}
          dangerouslySetInnerHTML={{ __html: entry.message }}
        />
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

const Chatbot = ({ onClose }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize your Gemini API
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Function to fetch relevant data from Firebase
  const fetchFirebaseData = async (query) => {
    try {
      const dataRef = ref(database, `masterSheet/${query}`);
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return "No specific data found";
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      return `Error retrieving data: ${error.message}`;
    }
  };

  // Function to simulate typewriter effect
  const typewriterEffect = (message, callback) => {
    let index = 0;
    const speed = 10; // Speed of typing in milliseconds
    const interval = setInterval(() => {
      setChatHistory(prev => {
        const lastEntry = prev[prev.length - 1];
        if (lastEntry && lastEntry.type === "bot") {
          const newMessage = message.slice(0, index + 1);
          return [...prev.slice(0, -1), { type: "bot", message: newMessage }];
        } else {
          return [...prev, { type: "bot", message: message.slice(0, index + 1) }];
        }
      });

      index++;
      if (index >= message.length) {
        clearInterval(interval);
        if (callback) callback(); // Call the callback function after typing is done
      }
    }, speed);
  };

  // Function to send user message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const firebaseData = await fetchFirebaseData(userInput);
      const context = `You are an expert in inventory management, transportation, and logistics. Use this information to answer the user's query: ${firebaseData}.`;

      const result = await model.generateContent(`${context} ${userInput}`);
      const response = await result.response;

      // Convert Markdown response to HTML
      const responseText = marked(await response.text());

      setChatHistory(prev => [
        ...prev,
        { type: "user", message: userInput },
      ]);

      // Use typewriterEffect to display the response
      typewriterEffect(responseText, () => {
        setUserInput("");
        setIsLoading(false);
      });
    } catch {
      console.error("Error sending message");
      setIsLoading(false);
    }
  };

  // Function to handle "Enter" key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        <ChatHistory chatHistory={chatHistory} />
      </div>
      <div className="text-field-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="send-button"
        >
          Send
        </button>
        <button
          className="close-button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
