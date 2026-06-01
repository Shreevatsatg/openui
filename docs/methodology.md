# METHODOLOGY OF STUDY

The development of the OpenUI Web Application followed a structured software development lifecycle (SDLC) to build a robust, responsive, and secure UI component sharing platform. The main phases of the methodology were:

## 1. Requirement Analysis
All key requirements for the OpenUI system were identified, gathered, and documented:
* **Authentication & Authorization:** Secure user registration and login utilizing JWT-backed sessions. A role-based routing flow restricts certain resources based on whether a client is a public visitor, registered contributor, or administrator.
* **Onboarding & Profile Setup:** A sequential auth-state hierarchy that handles profile lifecycle stages: `Loading` &rarr; (`No User` &rarr; `Login`) or (`Has User` &rarr; (`No Profile` &rarr; `Create Profile`) &rarr; (`Incomplete Profile` &rarr; `Onboarding`) &rarr; (`Complete Profile` &rarr; `Main App`)).
* **UI Component Catalog:** An open catalog for public visitors to browse, search, filter, and view detailed UI component pages, complete with metadata, usage specifications, and dependency list.
* **Component Submissions & Editing:** Registered users can submit new components (attaching code snippets, category, tags, description, and theme support declarations) and edit their previously submitted components.
* **Live Sandbox Preview:** An isolated view rendering user-submitted UI component code dynamically in a preview frame.
* **Contributor Leaderboard:** A public leaderboard ranking contributors based on their total count of approved component submissions.
* **Admin Review Dashboard:** An administrative moderation interface to approve or reject pending component submissions and review overview statistics.
* **Contribution Standards Page:** An in-app guide (`/contribute` path) describing formatting expectations, style guide adherence, and dark/light theme support checks.

---

## 2. System Design
The system architecture and data layout were designed for performance, modularity, and scalability:
* **Database Design:** A document-based NoSQL architecture using MongoDB. Modeled user profile metadata using embedded subdocuments (1:1 schema) for quick retrieval, and linked user accounts to UI contributions via referencing (1:Many relationship on `authorId`) to ensure fast queries and avoid hitting document size limitations.
* **Architecture:** Decoupled client-server model consisting of:
  * **Backend API:** Built using **Node.js**, **Express**, and **Mongoose** written in **TypeScript**.
  * **Frontend Client:** Built using **React 19**, **Vite**, and **TypeScript**, styled via **Tailwind CSS**.
  * **Routing & Authentication Flow:** Managed using React Router DOM. A central routing router (`CentralRouter`) acts as the single source of truth for checking profile status and navigating users.
* **UI/UX Design:** Dark-themed modern layout with glassmorphic cards, transition animations (leveraging Framer Motion), and modular input layouts.

---

## 3. Development
The codebase was developed iteratively across frontend and backend modules:
* **Backend:** Implemented RESTful Express API endpoints under `/api`. Developed routing controllers, custom authentication check middleware (`protect`), and administrator check middleware (`admin`). Configured CORS, parsed payloads using built-in body parsers, and wrote DB queries for leaderboard aggregations.
* **Frontend:** Developed component modules including code visualizers, dynamic registration and submission forms, tabs, and step-based onboarding wizard. Managed global user authentication states via `AuthContext` utilizing browser `localStorage` to persist JWT tokens across sessions.
* **Security:** Integrated `bcryptjs` hashing for storing and verifying password credentials. Implemented input sanitation, route-level authorization barriers, and restricted admin capabilities to validated administrator tokens.

---

## 4. Database Implementation
The application uses **MongoDB** as its primary NoSQL database. Schemas are structured and validated using **Mongoose ODM** in the backend. 

The `openui` database consists of 3 collections:
* **`users` collection:** Stores user credentials (name, email, hashed password), access role (`user` or `admin`), onboarding status flags (`hasProfile`, `onboarded`), and nested subdocuments for profile information (`profileData` containing bio, avatar image, personal website, and GitHub link).
* **`components` collection:** Stores details of each UI component including title, unique slug, descriptive summary, category, raw source code, preview image paths, tags array, dependency list, usage parameters, theme compatibility (`both`, `light`, or `dark`), review status (`pending`, `approved`, or `rejected`), and references the creator (`authorId`).
* **`categories` collection:** Stores categorization directories for UI components (name and unique slug).

Referential integrity is maintained at the application layer where `authorId` acts as a reference to a user document in the `users` collection. Unique database indexes are configured on `users.email`, `components.slug`, and `categories.slug` to optimize search lookups and guarantee unique identities.

---

## 5. Testing
System testing was executed to verify core functional flows:
* **User Onboarding Flow:** Confirmed registration, login validation, and verified that users are correctly redirected to profile creation and onboarding steps prior to reaching the main dashboard.
* **Submissions Process:** Verified that users can draft, preview, submit, and modify components, and that newly submitted components remain hidden (in `pending` state) until moderator action.
* **Admin Verification:** Ensured admin users can access the dashboard, view metrics, and change component statuses (`approved` or `rejected`) with corresponding database updates.
* **Component Sandbox Rendering:** Tested client-side rendering of dynamic HTML/JS code within isolated frames under light and dark themes.

---

## 6. Deployment and Hosting
* **Development Environment:** The application was built and run locally using Node.js. The backend Express API service ran on port `5000` while the frontend Vite development server ran on port `5173` (configured with proxy mapping `/api` requests to the local backend).
* **Production Build:** 
  * The backend TypeScript files compile via `tsc` into static JavaScript output within a `/dist` directory, executed on Node.js.
  * The frontend static web pages compile via Vite (`vite build`) producing static client assets in `frontend/dist`.
  * The application is set up for cloud deployment (e.g. Render, Vercel), where the backend is hosted as a web service running the build scripts, and the frontend is deployed to a static hosting platform targeting the live API host via the `VITE_API_URL` environment variable.
