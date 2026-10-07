# 🚌 BusV8 — Smart College Bus Tracking System

**BusV8** is a smart college bus tracking system designed to help students discover and track their college buses in real time.

Instead of requiring a dedicated GPS tracking device to be installed on every college bus, BusV8 uses the **smartphones of students/authorized users on the bus** to share live location information.

The system combines a React Native mobile application, Node.js backend, MongoDB database, and Google Maps to provide real-time bus location and tracking.

---

## 📱 Overview

Finding a college bus can be difficult when students do not know the current location of the bus or its expected arrival time.

Traditional bus tracking systems often require dedicated GPS hardware to be installed on every bus.

**BusV8 provides an alternative approach:** smartphones already available on the bus can be used to share the bus's live location.

This reduces the need for additional dedicated GPS tracking hardware.

---

## 🎯 Project Objective

The main objective of BusV8 is to provide a practical and cost-effective college bus tracking solution.

The system helps:

* Students find their college bus
* Students track the bus in real time
* Students view bus locations on a map
* Colleges manage buses and boarding points
* Authorized users share live bus locations
* Students identify the nearest/appropriate bus
* Improve visibility of bus movement

---

## ✨ Features

### 🚌 Real-Time Bus Tracking

BusV8 displays the current bus location on **Google Maps**.

Authorized smartphones can continuously share location information while the bus is travelling.

---

### 📍 Live Location Sharing

The application can use the smartphone's location services to share the bus's current location.

The location can be tracked in the background so that the tracking process can continue while the application is not actively being viewed.

---

### 🗺️ Google Maps Integration

Google Maps is used to visualize:

* Bus locations
* Boarding points
* Location markers
* Bus movement

---

### 🎓 College Management

The system supports college-related bus management, including:

* College registration
* Bus registration
* Bus management
* Boarding-point management

---

### 👨‍🎓 Student Interface

Students can use the application to:

* Discover available buses
* View live bus locations
* View boarding points
* Track their bus
* Manage their profile
* Manage account settings

---

### 🚍 Driver / Bus Location Interface

Authorized users can provide the live location of the bus using their smartphone.

The system uses this location to update the bus position for students.

---

### 🔐 Authentication

BusV8 provides authentication functionality for authorized users.

The system includes:

* User registration
* Login
* Authentication
* Password reset
* Account management
* Automatic login

JWT is used for authentication.

---

### 👤 Profile & Settings

Users can manage their:

* Profile
* Account settings
* Application preferences

---

## 🧠 How BusV8 Works

The basic workflow is:

```text
        Student / Authorized User
                  │
                  ▼
        ┌─────────────────────┐
        │  React Native App   │
        │                     │
        │ GPS Location        │
        │ Bus Information     │
        └──────────┬──────────┘
                   │
                   │ Axios / API
                   ▼
        ┌─────────────────────┐
        │ Node.js + Express   │
        │       Backend       │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │      MongoDB        │
        │                     │
        │ Users               │
        │ Buses               │
        │ Locations           │
        │ Boarding Points     │
        └─────────────────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │    React Native     │
        │    Student App      │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │    Google Maps      │
        │                     │
        │ Live Bus Location   │
        └─────────────────────┘
```

---

## 🏗️ System Architecture

```text
Smartphone GPS
      │
      ▼
React Native + Expo
      │
      │ HTTP API
      ▼
Node.js + Express.js
      │
      ▼
MongoDB
      │
      │
      ▼
React Native Client
      │
      ▼
Google Maps
      │
      ▼
Live Bus Location
```

---

## 🛠️ Technologies Used

### Mobile Application

* React Native
* Expo
* JavaScript
* Axios
* AsyncStorage

### Backend

* Node.js
* Express.js
* JavaScript

### Database

* MongoDB

### Maps & Location

* Google Maps
* Smartphone GPS / Location Services
* Background Location Tracking

### Authentication

* JSON Web Token (JWT)

### Development Tools

* Visual Studio Code
* Expo
* Git
* GitHub

---

## 📂 Project Structure

A typical project structure is:

```text
busv8/
│
├── mobile/
│   ├── assets/
│   ├── components/
│   ├── screens/
│   ├── services/
│   ├── navigation/
│   ├── utils/
│   ├── App.js
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

> Update the structure above if your actual repository uses different folder names.

---

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

* Node.js
* npm
* Expo
* React Native development environment
* Android Studio
* Android SDK
* MongoDB
* Git

---

## 📥 Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd busv8
```

---

## 📱 Mobile Application Setup

Navigate to the mobile application directory:

```bash
cd mobile
```

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

The application can then be tested using a compatible Android device/emulator.

---

## 🖥️ Backend Setup

Open another terminal and navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Configure your environment variables in `.env`.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**Never upload your actual `.env` file or secret credentials to GitHub.**

Start the backend:

```bash
npm start
```

---

## 📍 Location Tracking Workflow

BusV8 uses smartphone location services to provide live bus tracking.

The workflow is:

```text
Smartphone GPS
      ↓
Current Latitude / Longitude
      ↓
React Native Application
      ↓
Backend API
      ↓
MongoDB
      ↓
Student Application
      ↓
Google Maps
      ↓
Live Bus Marker
```

This allows students to see the current location of the bus.

---

## 🔐 Authentication

BusV8 uses **JWT-based authentication** to protect authenticated functionality.

The authentication flow is:

```text
User Login
    ↓
Credentials Verified
    ↓
JWT Generated
    ↓
Token Stored
    ↓
Authenticated API Requests
```

AsyncStorage is used on the mobile application for persistent client-side storage where required.

---

## 🗺️ Bus & Boarding Point Management

The system supports management of:

### Buses

* Bus registration
* Bus information
* Bus tracking
* Bus location

### Boarding Points

* Boarding point registration
* Boarding point information
* Location information
* Student access to boarding-point information

---

## 📸 Screenshots

Add screenshots of your actual application here.

### Home / Bus List

```markdown
![BusV8 Home](screenshots/home.png)
```

### Live Bus Tracking

```markdown
![Live Bus Tracking](screenshots/live-tracking.png)
```

### Google Maps

```markdown
![Bus Location Map](screenshots/map.png)
```

### Login

```markdown
![Login](screenshots/login.png)
```

### Bus / Boarding Point

```markdown
![Bus Details](screenshots/bus-details.png)
```

Recommended folder:

```text
screenshots/
├── home.png
├── login.png
├── live-tracking.png
├── map.png
└── bus-details.png
```

---

## 💡 Why BusV8?

Traditional bus tracking solutions may require a dedicated GPS tracking device for each bus.

BusV8 explores a different approach:

```text
Traditional Approach

Bus
 ↓
Dedicated GPS Device
 ↓
Tracking Server
 ↓
Student
```

BusV8 approach:

```text
Bus
 ↓
Student / Authorized Smartphone
 ↓
GPS Location
 ↓
BusV8 Server
 ↓
Student Application
```

This can reduce the requirement for additional dedicated GPS hardware.

---

## 🎯 Key Benefits

* Real-time bus visibility
* Smartphone-based location sharing
* Reduced dependency on dedicated GPS hardware
* Google Maps integration
* Student-focused interface
* Centralized bus management
* Boarding-point management
* Secure authentication
* Background location tracking

---

## 🔮 Future Improvements

Possible future improvements include:

* Estimated Time of Arrival (ETA)
* Route visualization
* Push notifications
* Bus arrival notifications
* Geofencing
* Multiple colleges
* Advanced admin dashboard
* Route history
* Trip history
* Driver verification
* Improved location accuracy
* Offline support
* Analytics and reporting

---

## 📊 Project Status

**Completed ✅**

BusV8 is a completed smart college bus tracking project developed to provide real-time bus discovery and location tracking using smartphones and cloud-based software technologies.

---

## 👨‍💻 Developer

**Tamilselvan**

Software Developer

---

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.
