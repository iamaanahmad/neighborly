# Neighborly 🤝

**Get and Give Help in Your Community — Powered by AI**

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime_Backend-orange?logo=firebase)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI_Powered-blue?logo=google&logoColor=white)](https://ai.google/gemini/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-cyan?logo=tailwind-css)](https://tailwindcss.com/)
[![ShadCN UI](https://img.shields.io/badge/shadcn/ui-Styled_Components-black)](https://ui.shadcn.com/)

**Neighborly** is a hyper-local, AI-enhanced web application designed to connect individuals in need with volunteers in their community. It bridges the gap between asking for help and offering it, using technology to foster real-world connections and support.

This project was built to demonstrate the power of combining a modern web stack with cutting-edge AI to solve a genuine community problem.

---

### ✨ Key Features

-   **🤖 AI-Powered Assistance (Gemini & Genkit):**
    -   **Help Request Generation**: Users can input a rough idea of their needs (e.g., "need groceries"), and our AI assistant will draft a clear, polite, and effective request post.
    -   **Smart Chat Replies**: Volunteers receive AI-generated suggestions for quick and empathetic replies, making communication faster and friendlier.
    -   **Content Moderation**: Every request is automatically scanned by our AI to ensure a safe and respectful community environment.

-   **⚡ Real-Time & Role-Based:**
    -   **Live Request Board**: The "Offer Help" page updates in real-time with new requests from the community, powered by Firestore.
    -   **Instant Messaging**: A secure, real-time chat connects seekers and helpers to coordinate details privately.
    -   **Role-Based Dashboards**: The user experience is tailored to whether a user signs up as a **Seeker** (needs help), a **Helper** (offers help), or **Both**.

-   **🔒 Trust & Scalability:**
    -   **Admin Insights Dashboard**: A built-in dashboard provides a high-level overview of community activity, including user stats and request statuses, showcasing the platform's potential for management.
    -   **Secure & Scalable Backend**: Built on **Firebase** for reliable authentication, data storage, and real-time updates.

-   **🎨 Modern & Responsive UI:**
    -   Built with **Next.js App Router** for a fast, server-first experience.
    -   Styled with **Tailwind CSS** and **ShadCN UI** for a clean, beautiful, and fully responsive interface that looks great on any device.

---

### 🚀 Getting Started

#### Demo Credentials

To make it easy for you to test, we've set up a demo user with the **"Both"** role, so you can explore all features immediately.

-   **Email**: `demo@neighborly.app`
-   **Password**: `password123`

Just head to the [Login Page](https://neighborly-app.web.app/login) and use the "Login as Demo User" button for one-click access.

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
3.  **AI Assistance**: They type a simple need, and our AI helps them draft a well-structured post.
4.  **Get Connected**: The request is posted live. A helper offers to assist, and a private chat is automatically created.
5.  **Coordinate**: They use the chat to coordinate details with the volunteer.

#### For a Helper (A volunteer):
1.  **Sign Up**: Creates an account and chooses the "Helper" role.
2.  **Find Requests**: From their dashboard, they browse a live list of open requests from their neighbors.
3.  **Offer Help**: They find a request they can fulfill and click "Offer to Help."
4.  **Connect & Chat**: They are instantly connected with the seeker in a private chat to arrange the details. AI suggestions help them reply quickly.

---

This project showcases a complete, end-to-end solution that is not only functional but also scalable, user-friendly, and built with a deep consideration for responsible AI implementation.
