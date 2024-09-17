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

  const subscribe = async () => {
    // Check if push notifications are supported and allowed
    if (navigator.serviceWorker && window.PushManager && window.Notification) {
      // Request permission to send push notifications
      const serviceWorkerRegistration = await navigator.serviceWorker.getRegistration();
      let subscription = null;
      try {
        subscription = await serviceWorkerRegistration.pushManager.getSubscription();
      } catch (error) {
        alert(`Error getting subscription: ${JSON.stringify(error)}`);
        return;
      }

      try {
        if (!subscription) {
          alert('No subscription found, generating a new one');
          const response = await fetch(`${process.env.REACT_APP_API}/push/get-vapid-public-key`);
          alert(`Response status: ${response.status}`);
          const vapidPublicKey = await response.text();
          alert(`Vapid public key: ${vapidPublicKey}`);
          subscription = await serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: vapidPublicKey
          }).then(function (subscription) {
            alert('Subscription generated');
            return subscription;
          }).catch(function (error) {
            alert(`Error on subscribe method: ${error}`);
            throw error;
          });;
        }
      } catch (error) {
        alert(`Error generating subscription: ${JSON.stringify(error)}`);
        return;
      }

      try {

        await fetch(`${process.env.REACT_APP_API}/push/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subscription)
        });
      } catch (error) {
        alert(`Error sending subscription to server: ${JSON.stringify(error)}`);
      }
    }
  }

  return (
    <div>
      <button onClick={sendNotification}>notify</button>
      <button onClick={subscribe}>Subcribe</button>
      PWA Push Notification
    </div>
  );
}

export default App;
