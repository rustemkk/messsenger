// require('./preloadWebview');
// TODO: find problem for skype notification override - right now r it equires reload for every fired notification


setTimeout(() => {
  Array.from(document.getElementsByTagName('a')).find(t => t.innerText === 'Download Desktop App').parentElement.parentElement.style.display = 'none';
}, 15000);
