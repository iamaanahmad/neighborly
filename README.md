# Neighborly 🤝

**Get and Give Help in Your Community — Powered by AI**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open_App-brightgreen)](https://studio--studio-8690552426-bc4ba.us-central1.hosted.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime_Backend-orange?logo=firebase)](https://firebase.google.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_Powered-blue?logo=google&logoColor=white)](https://ai.google/gemini/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-cyan?logo=tailwind-css)](https://tailwindcss.com/)
[![ShadCN UI](https://img.shields.io/badge/shadcn/ui-Styled_Components-black)](https://ui.shadcn.com/)

**Neighborly** is a hyper-local, AI-enhanced web application designed to connect individuals in need with volunteers in their community. It bridges the gap between asking for help and offering it, using technology to foster real-world connections and support.

This project was built to demonstrate the power of combining a modern web stack with cutting-edge AI to solve a genuine community problem.

---

### ✨ Key Features

-   **🤖 AI-Powered Assistance (Google Gemini & Genkit):**
    -   **Help Request Generation**: Users can input a rough idea of their needs (e.g., "need groceries"), and our AI assistant drafts a clear, polite, and effective request post. This is powered by the `help-request-assistance.ts` Genkit flow, which uses a Gemini prompt to transform simple user input into a well-structured request.
    -   **Smart Chat Replies**: Volunteers receive AI-generated suggestions for quick and empathetic replies, making communication faster and friendlier. The `chat-suggestion.ts` flow analyzes the conversation history and suggests context-aware responses, improving the interaction between helpers and seekers.
    -   **Content Moderation**: Every request is automatically scanned by the `moderate-text.ts` Genkit flow to ensure a safe and respectful community environment. The AI checks for profanity, hate speech, and other inappropriate content, automatically flagging or blocking posts that violate community guidelines.

-   **⚡ Real-Time & Role-Based:**
    -   **Live Request Board**: The "Offer Help" page updates in real-time with new requests from the community. This is achieved using a Firestore `onSnapshot` listener in the `offer-list.tsx` component, ensuring volunteers always see the most current needs.
    -   **Instant Messaging**: A secure, real-time chat connects seekers and helpers to coordinate details privately. Built on Firestore, it allows for instant communication, complete with AI-suggested replies for helpers.
    -   **Role-Based Dashboards**: The user experience is tailored to whether a user signs up as a **Seeker** (needs help), a **Helper** (offers help), or **Both**. The dashboard dynamically displays relevant actions and information based on the user's role.

-   **🔒 Secure & Scalable Backend:**
    -   **Firebase Authentication**: Secure email/password and demo user login flows are handled by Firebase Auth.
    -   **Firestore Database**: All application data, including users, requests, and chat messages, is stored and managed in Firestore, providing real-time data synchronization and a scalable data structure.
    -   **Admin Insights Dashboard**: A built-in dashboard provides a high-level overview of community activity, including user stats and request statuses, showcasing the platform's potential for management.

-   **🎨 Modern & Responsive UI:**
    -   Built with **Next.js App Router** for a fast, server-first experience with optimized routing.
    -   Styled with **Tailwind CSS** and **ShadCN UI** for a clean, beautiful, and fully responsive interface that looks great on any device.
    -   Includes a user-toggleable light/dark mode theme.

---

### 🚀 Getting Started

#### Demo Credentials

To make it easy for you to test, we've set up a demo user with the **"Both"** role, so you can explore all features immediately.

-   **Email**: `demo@neighborly.app`
-   **Password**: `password123`

Just head to the login page and use the "Login as Demo User" button for one-click access.

---

### 💻 Technology Stack

| Category      | Technology                                                                                                  | Purpose                                                              |
| :------------ | :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| **Frontend**  | [**Next.js**](https://nextjs.org/) ([App Router](https://nextjs.org/docs/app)) & [**React**](https://react.dev/) | Performance, SSR, and modern React architecture.                     |
| **Backend**   | [**Firebase**](https://firebase.google.com/)                                                                  | Authentication, Firestore (NoSQL DB), and real-time data synchronization. |
| **AI**        | [**Google Gemini**](https://ai.google/gemini/) via [**Genkit**](https://firebase.google.com/docs/genkit)        | AI-powered text generation, suggestions, and content moderation.     |
| **Styling**   | [**Tailwind CSS**](https://tailwindcss.com/) & [**ShadCN UI**](https://ui.shadcn.com/)                           | Responsive design and a beautiful, modern component library.         |
| **Language**  | [**TypeScript**](https://www.typescriptlang.org/)                                                             | Type safety and improved developer experience.                       |

---

### 👤 User Flows

#### For a Seeker (Someone who needs help):
1.  **Sign Up**: Creates an account and chooses the "Seeker" role.
2.  **Request Help**: From their dashboard, they navigate to the request form.
3.  **AI Assistance**: They type a simple need (e.g., "Need dog walked"), and the AI helps them draft a well-structured post.
4.  **Submit & Moderation**: The request is sent to the `moderate-text` flow. If approved, it's posted live on the "Offer Help" board.
5.  **Get Connected**: A helper offers to assist, creating a private chat room in the "Messages" page.
6.  **Coordinate**: They use the real-time chat to coordinate details with the volunteer.

#### For a Helper (A volunteer):
1.  **Sign Up**: Creates an account and chooses the "Helper" role.
2.  **Find Requests**: From their dashboard, they browse a live list of open requests from their neighbors.
3.  **Offer Help**: They find a request they can fulfill and click "Offer to Help," which navigates them to the "Messages" page.
4.  **Connect & Chat**: A new chat with the seeker is automatically created. The helper can use AI-suggested replies from the `chat-suggestion` flow to respond quickly.

---

This project showcases a complete, end-to-end solution that is not only functional but also scalable, user-friendly, and built with a deep consideration for responsible AI implementation.
