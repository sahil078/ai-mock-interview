const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "job Position : Full stack developer , Job Description: React , MySQL, Node.js , Years of Experience:2 , Depend on the information please give me 5 Interview questions and answer in JSON format, GIve Question and Answer as field in JSON \n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"Question\": \"Describe your experience with React.js, including any specific libraries or frameworks you've used.\",\n    \"Answer\": \"I have two years of experience developing web applications using React.js. I'm familiar with core concepts like components, props, state management, and lifecycle methods. I've also worked with popular libraries like Redux and React Router for managing complex applications. In my previous role, I used React to build a dynamic dashboard with interactive charts and data visualizations.\"\n  },\n  {\n    \"Question\": \"Explain the difference between a stateless and stateful component in React, and provide an example of when you would use each.\",\n    \"Answer\": \"A stateless component is a function component that receives props as input and returns a JSX structure. They don't have their own internal state and are used for simple UI elements or presentational components. For example, a button or a list item can be stateless. A stateful component, on the other hand, manages its own state using the `useState` hook and can modify its UI based on internal changes. An example would be a form where you want to track user input or a counter component that updates its display.\"\n  },\n  {\n    \"Question\": \"How would you approach handling data persistence in a React application using MySQL and Node.js?\",\n    \"Answer\": \"I would use Node.js to create an API server that interacts with the MySQL database. This API would provide endpoints for retrieving, creating, updating, and deleting data. On the React frontend, I would use `fetch` or `axios` to make requests to the API and update the application state with the retrieved data. To manage data fetching and caching, I would implement a state management library like Redux, ensuring data consistency across the application.\"\n  },\n  {\n    \"Question\": \"Describe a time you had to debug a complex issue in a React application. What steps did you take to solve the problem?\",\n    \"Answer\": \"I once had a React application where a data update was not propagating correctly to the UI. I started by examining the Redux store and the component state to identify the source of the problem. After reviewing the code, I discovered a bug in a custom middleware function that was preventing the action from being dispatched properly. I fixed the middleware function, and the update was reflected in the UI as expected. This experience taught me the importance of utilizing debugging tools, understanding the flow of data, and carefully reviewing code to identify potential issues.\"\n  },\n  {\n    \"Question\": \"What are some best practices you follow when building a React application, especially in terms of code organization and maintainability?\",\n    \"Answer\": \"I prioritize code organization and maintainability by using component-based architecture, separating concerns, and adhering to best practices for state management. I utilize a clear folder structure to separate components, styles, and utility functions. I strive for code reusability by creating reusable components and utility functions. Additionally, I write clear and concise documentation and comments to improve code readability and maintainability.\"\n  }\n]\n```"},
          ],
        },
      ],
    });

// Export the initialized session
export { chatSession };
