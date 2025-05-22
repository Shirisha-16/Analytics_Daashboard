# **PGAGI Analytics Dashboard**  

## **1. Project Overview**  
The **PGAGI Analytics Dashboard** is a **comprehensive web application** designed to **fetch, process, and display real-time data** from multiple APIs. Built using **Next.js, TypeScript, and Tailwind CSS**, it provides an **interactive user experience** with advanced features like **drag-and-drop customization, dark mode, smooth animations, and error handling**.  

This dashboard is developed to help users **track weather forecasts, news updates, and financial stock market data** in an intuitive and visually appealing interface.  

---

## **2. Key Features**  
🔹 **Weather, News, and Stock Data Fetching** – Integrates **OpenWeather API, NewsAPI, and Alpha Vantage API** to fetch real-time updates.
🔹 **Secure Authentication System** - It allows users to signup,login using **NextAuth**.
🔹 **Google OAuth Integration** - signin/signup via using Google accounts via **Nextjs**.
🔹 **Form Validation** - client-side form validation using **ReactHook form** and **zod**.
🔹 **Database Integration** - persistent user data storage using **Mongodb** via **Prisma ORM**.
🔹 **Protect sensitive routes and data, ensuring only authenticated users can access dashboard**.
🔹 **Drag-and-Drop Widget Customization** – Users can rearrange dashboard elements using **react-beautiful-dnd**.  
🔹 **Dark Mode Toggle** – A built-in dark mode feature for a **better viewing experience**.
🔹 **Home page image varies with mode(dark or light)- This is my favourite feature.
🔹 **Dynamic weather Background** - page background changes dynamically based on weather conditions(sunny,rainy,cloudy,etc).
🔹 **Performance Optimization** – Implemented **lazy loading, code splitting, and caching** for **faster performance**.  
🔹 **Smooth Animations** – Integrated **Framer Motion** for **interactive UI transitions**.  
🔹 **Error Handling & API Fallbacks** – Ensures a **seamless experience** even when APIs fail.  
🔹 **Unit & E2E Testing** – Thoroughly tested using **Jest & Cypress** for **reliability and robustness**.  
🔹 **Live Deployment on Vercel** – Hosted at ****.  

---

## **3. Technology Stack**  
The project was developed using modern web technologies:  

### **Frontend Technologies**  
- **Next.js (React + TypeScript)** – The core framework for building the application.  
- **Tailwind CSS & SCSS** – Used for styling and creating a **responsive UI**.  
- **Framer Motion** – Enables smooth animations and UI transitions.  
- **Recharts** – Data visualization for stock and weather trends.  
- **React Query & Redux Toolkit** – Efficient state and API management.  

### **Backend & APIs**  
- **OpenWeather API** – Fetches weather details for any location.  
- **NewsAPI** – Retrieves the latest news headlines.  
- **Alpha Vantage API** – Provides stock market updates. 

### **Database & ORM **
- **mongodb** - primary source to store user's data
- **Prisma** - layer between nextjs application and mongodb

### **Testing & Deployment**  
- **Jest & React Testing Library** – For unit and integration testing.  
- **Cypress** – For end-to-end testing.  
- **Vercel** – Deployment and hosting.  

---

## **4. Project Development Workflow**  

### **Step 1: Project Setup**  
- Initialized the project using **Next.js with TypeScript**.  
- Configured **Tailwind CSS, SCSS, and absolute imports**.  
- Established a **modular folder structure**. 
- Integrate **Mongodb with Prisma ORM for database management and safe data access** 

### **Step 2: API Integration**  
- Implemented API calls using **React Query** for efficient data fetching.  
- Created reusable components for **Weather, News, and Stocks**.  
- Implemented **Secure user authentication using NextAuthjs**,including:
   -**Credentials Provider** for email/password sign-up and sign-in.
   -**OAuth Providers(Google)** for social login.
   -**Server side session mangagement** with **getServerSession** for protected routes.
   -**Middleware** for route protection and redirection. 
- Developed **custom API routes for user registration**

### **Step 3: UI/UX Enhancements**  
- Developed a **dashboard layout** with **Navbar, Sidebar, and Cards**.  
- Integrated **drag-and-drop functionality** for reordering widgets.  
- Added **dark mode toggle** and **dynamic animations** for a better experience. 
- **Logo changes with darkmode and lighmode to feel the change**.
- Implemented dynamic page background for weather condition**.
- ** Utilised react hook form with zod to robust form validation in authentication **

### **Step 4: Performance Optimization**  
- Applied **lazy loading and code splitting** for faster rendering.  
- Used **Redux Toolkit** for managing complex application states.
- Leveraged **TanStack Query** for efficient data fetching, caching, and synchronization.  

### **Step 5: Testing & Error Handling**  
- Added **global error boundaries** to catch unexpected failures.  
- Implemented **Jest tests** for unit components.  
- Conducted **Cypress end-to-end testing** to validate user workflows.  

### **Step 6: Deployment & Documentation**  
- Deployed the application using **Vercel**.  
- Created a detailed **README file** with installation steps and contribution guidelines.  

---

## **5. Installation & Setup**  

### **Clone the Repository**  
```bash
git clone https://github.com/Vishnu-000/pgagi-analytics-dashboard.git
cd pgagi-analytics-dashboard
```

### **Install Dependencies**  
```bash
yarn install
```

### **Set Up Environment Variables**  
Create a `.env.local` file and add API keys:  
```env
NEXT_PUBLIC_OWM_API_KEY=your_weather_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_FINANCE_API_KEY=your_finance_api_key

# NextAuth.js Secret (Generate a strong random string, e.g., using `openssl rand -base64 32`)
NEXTAUTH_SECRET="your_nextauth_secret_key"

# MongoDB Database URL (from MongoDB Atlas or your local instance)
# Ensure you replace <db_password> with your actual password and <database_name> with your chosen database name.
DATABASE_URL="mongodb+srv://tyarlashirisha:<db_password>@cluster0.vdwb83l.mongodb.net/<database_name>?retryWrites=true&w=majority&appName=Cluster0"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# GitHub OAuth (Optional)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

```

### **Run the Application**  
```bash
yarn dev
```
The application will run at **http://localhost:3000**  

### **Testing Commands**  
Run unit tests:  
```bash
yarn test
```
Run End-to-End (E2E) tests:  
```bash
yarn e2e
```

### **Live Deployment on Vercel**  
 

---

## **6. Project Folder Structure**  
```
/components    # Reusable UI components
/pages         # Next.js pages
/store         # Redux state management
/hooks         # Custom hooks
/services      # API integrations
/utils         # Utility functions
/tests         # Unit & E2E tests
```

---

## **7. Conclusion**  
The **PGAGI Analytics Dashboard** is a **high-performance, scalable, and user-friendly web application** that seamlessly integrates **real-time weather, news, and financial data**. With **drag-and-drop functionality, dark mode, and smooth animations**, it provides an **engaging and interactive experience**.  

This project showcases **best practices in frontend development**, including:  
✔️ **State management with Redux Toolkit & React Query**  
✔️ **Advanced UI/UX with Tailwind CSS & Framer Motion**  
✔️ **Error handling & API optimizations**  
✔️ **Unit & E2E testing for reliability**  




