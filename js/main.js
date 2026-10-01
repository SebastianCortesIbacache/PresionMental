import './store.js';
import './ui.js';
import './db.js';
import './game.js';

console.log("Reto Panda Modular Initialized Successfully!");

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(registration => {
      console.log('SW registrado con éxito:', registration.scope);
    }).catch(error => {
      console.log('Fallo en el registro del SW:', error);
    });
  });
}
