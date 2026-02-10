import { createGameButton } from "../../components/buttons/buttonMenuGame";
import "./pantallaInicio.css";

export const pantallaInicio = () => {
  const divApp = document.querySelector("#app")
  const divMenuJuegos = document.createElement("div");
  const divTitulo = document.createElement("div");
  divTitulo.className = "divTitulo";
  const titulo = document.createElement("h1");
  titulo.className = "titulo-h1";
  titulo.textContent = "PROYECTO 5 GAMES HUB";

  const divBotonesJuegos = document.createElement("div");
  divBotonesJuegos.className = "botones-juegos";
  const tresBtn = createGameButton("TRES EN RAYA", "/tres-en-raya");
  const btnSimonDice = createGameButton("Simon Dice Game", "/GameSimonDice");
  const btnPPT = createGameButton("Piedra Papel Tijera", "/piedra-papel-tijera");

  const footer = document.createElement("footer");
  footer.className = "menu-footer";
  const footerText = document.createElement("p");
  footerText.textContent = "Proyecto de Fernando Dapia ";
  footer.appendChild(footerText);

  divBotonesJuegos.append(tresBtn, btnSimonDice, btnPPT);
  divMenuJuegos.className = "divMenuJuegos";
  divTitulo.append(titulo);
  divMenuJuegos.append(divTitulo, divBotonesJuegos, footer );
  divApp.append(divMenuJuegos);
};

export default pantallaInicio;
