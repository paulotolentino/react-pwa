# React App with Push Notifications

This project is a React application created using Create React App (CRA). It includes a service worker that listens for push notifications and registers the device for receiving them.

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Getting Started

Follow the instructions below to set up and run the project.

### 1. Install Dependencies

First, install the necessary dependencies. Open your terminal and run:

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory of the project. Use the `.env.example` file as a reference for the required environment variables. Make sure to provide the necessary API endpoint and VAPID key values.

### 3. Register the Service Worker

The app automatically registers a service worker that listens for push notifications. During registration, it checks for an existing subscription using:

```javascript
serviceWorkerRegistration.pushManager.getSubscription();
```

If no subscription is found, it makes a `GET` request to the backend API endpoint `/push/get-vapid-public-key` to retrieve the public VAPID key. It then subscribes the device using:

```javascript
serviceWorkerRegistration.pushManager.subscribe();
```

### 4. Subscribe the Device for Push Notifications

Once subscribed, a `POST` request is sent to the backend endpoint `/push/subscribe` to register the device for receiving push notifications. This ensures that the device is properly configured to receive notifications sent by the backend.

### 5. Running the Application

To run the application in development mode, use the following command:

```bash
npm start
```

This will start the application on `http://localhost:3000` by default. The page will reload if you make edits. You will also see any lint errors in the console.

### 6. Build the Application

To build the application for production, use the following command:

```bash
npm run build
```

This will create an optimized production build in the `build` folder. The build is minified, and filenames include the hashes.

## How Push Notifications Work in This App

1. **Service Worker Registration**: When the application loads, it registers a service worker to handle push notifications.
2. **Checking for Existing Subscriptions**: The app checks if the device is already subscribed to push notifications using `pushManager.getSubscription()`.

3. **Requesting VAPID Public Key**: If no subscription exists, it makes a `GET` request to the `/push/get-vapid-public-key` endpoint to retrieve the VAPID public key from the backend.

4. **Subscribing to Push Notifications**: With the VAPID key, it subscribes the device to push notifications using `pushManager.subscribe()`.

5. **Registering Subscription with Backend**: After subscribing, the app sends a `POST` request to the `/push/subscribe` endpoint to register the subscription with the backend.
