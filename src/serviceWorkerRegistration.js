export function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(() => {
      alert('Service worker registered');

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
