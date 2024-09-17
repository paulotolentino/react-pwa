export function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(async (serviceWorkerRegistration) => {
      alert('Service worker registered');
      let subscription = null;
      try {
        subscription = await serviceWorkerRegistration.pushManager.getSubscription();
      } catch (error) {
        alert(`Error getting subscription: ${JSON.stringify(error)}`);
        return;
      }

      try {
        if (!subscription) {
          const response = await fetch(`${process.env.REACT_APP_API}/push/get-vapid-public-key`);
          const vapidPublicKey = await response.text();
          subscription = await serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: vapidPublicKey
          });
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
    }).catch((error) => {
      alert(`Error registering service worker: ${JSON.stringify(error)}`);
    });
  } else {
    alert('Service worker not supported');
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister().then(() => {
          alert('Service worker unregistered');
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
