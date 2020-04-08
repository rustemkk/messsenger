require('./preloadWebview');


setTimeout(() => {
  Array.from(document.getElementsByTagName('a')).find(t => t.innerText === 'Download Desktop App').parentElement.parentElement.style.display = 'none';
}, 15000);
