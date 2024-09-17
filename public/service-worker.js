self.addEventListener("push", function (event) {
  if (event.data) {
    var data = event.data.json();
    self.registration.showNotification(data.notification.title, {
      body: data.notification.body,
      icon: data.notification.icon,
      image: data.notification.image,
      vibrate: data.notification.vibrate,
      badge: data.notification.badge,
      data: data.notification.link



      , timestamp: data.notification.timestamp,
      dir: data.notification.dir,
      actions: data.notification.actions
    });
  } else {
    console.log("Push event but no data");
  }
});