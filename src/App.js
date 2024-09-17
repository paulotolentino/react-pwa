import React from 'react';
const registration = await navigator.serviceWorker.getRegistration();

function App() {
  const sendNotification = async () => {
    if (Notification.permission === 'granted') {
      showNotification("notifica");
    }
    else {
      if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          showNotification("notifica");
        }
      }
    }
  };

  const showNotification = body => {
    const title = 'What PWA Can Do Today';

    const payload = {
      body
    };

    if ('showNotification' in registration) {
      registration.showNotification(title, payload);
    }
    else {
      new Notification(title, payload);
    }
  };

  return (
    <div>
      <button onClick={sendNotification}>notify</button>
      PWA Push Notification
    </div>
  );
}

export default App;
