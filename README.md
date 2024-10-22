# 🚀 Full Stack AI Mock Interview App with Next.js! 💻

Welcome to the **AI Mock Interview App**! This project leverages modern technologies to provide a powerful AI-driven mock interview experience. Get ready to enhance your interview skills with our interactive platform!

## 🌟 Features
- **AI-Powered Mock Interviews**: Get real-time feedback and ratings on your answers.
- **User Authentication**: Secure sign-up and login using **Clerk**.
- **Dynamic Feedback**: Personalized feedback based on your performance.
- **Intuitive Dashboard**: Track your progress and view past interviews.

## 🛠️ Technologies Used
- **Next.js**: A powerful React framework for building server-rendered applications.
- **React**: A JavaScript library for building user interfaces.
- **Drizzle ORM**: A lightweight ORM for managing database interactions.
- **Gemini AI**: AI integration for generating interview questions and analyzing responses.
- **Clerk**: User authentication and management.

## 📦 Installation

To get started with the AI Mock Interview App, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/sahil078/ai-mock-interview.git
cd ai-mock-interview
```

### 2. Install Dependencies
```Run this command to install the required packages:

npm install
```

### 3. Environment Variables
Create a .env.local file in the root of the project and add your environment variables. Make sure to set up the following:
```

GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= Clerk API key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_DRIZZLE_DB_URL = Drizzle ORM Database URL
NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT= 5;
NEXT_PUBLIC_INFORMATION = Enable Video Web cam and Microphone to Start your AI Generated Mock Interview, It Has five Questions which you can answer and at the end you will get the report on the basis of your answer. NOTE: We never record your video , Web cam access you can disable at any time if you want
NEXT_PUBLIC_QUESTION_NOTE = Click on Record Answer When you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each questions and your answer to compare it.

```

### 4. Start the Development Server
Run the development server with:
```
npm run dev


```
### 5. Start the Development Server
Navigate to http://localhost:3000 in your browser to see the app in action! 🎉



