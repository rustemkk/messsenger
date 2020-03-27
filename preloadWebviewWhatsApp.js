require('./preloadWebview');


const stopServiceWorker = async () => {
  try {
    const registrations = await window.navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      registration.unregister();
    }
  } catch (err) {
    console.err(err);
  }
};

window.addEventListener('load', async () => {
  await stopServiceWorker();
});
