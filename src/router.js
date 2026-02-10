import { initGameSimonDice } from "./pages/game-simon-dice/gameSimonDice.js";
import { pantallaInicio } from "./pages/pantalla-inicio/pantallaInicio.js";
import { initPiedraPapelTijera } from "./pages/piedra-papel-tijera/piedraPapelTijera.js";

const routes = {
  "/": pantallaInicio,
  "/GameSimonDice": initGameSimonDice,
  "/piedra-papel-tijera": initPiedraPapelTijera
};

export const router = () => {
  const path = window.location.hash.slice(1) || "/";
  const component = routes[path] || pantallaInicio;
  const app = document.querySelector("#app");
  app.innerHTML = "";
  component(app);
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
