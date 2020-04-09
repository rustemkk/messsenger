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

setTimeout(() => {
  Array.from(document.getElementsByTagName('div')).find(t => t.innerText === 'Update available').parentElement.parentElement.parentElement.parentElement.style.display = 'none';
}, 20000);
