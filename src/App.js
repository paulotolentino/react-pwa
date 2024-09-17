import React from 'react';

function App() {

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
          const vapidPublicKey = await response.text();
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
      <button onClick={subscribe}>Subcribe</button>
      PWA Push Notification
    </div>
  );
}

export default App;
