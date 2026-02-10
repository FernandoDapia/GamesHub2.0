import {
  JUGADORES,
  RESULTADOS,
  comprobarGanador,
  jugadaMaquina,
} from "./terLogica";

export const initTresEnRaya = (divApp) => {
  const terContainer = document.createElement("div");
  terContainer.className = "ter-container";

  const tituloGame = document.createElement("h2");
  tituloGame.textContent = "TRES EN RAYA";

  const infoPanel = document.createElement("div");
  infoPanel.className = "info-panel-ter";

  const marcador = document.createElement("div");
  marcador.className = "marcador";

  const marcadorX = document.createElement("div");
  marcadorX.className = "marcador-item jugador-x";
  marcadorX.innerHTML = `<span class="marcador-label">Jugador (X)</span><span class="marcador-puntos">0</span>`;

  const marcadorVs = document.createElement("div");
  marcadorVs.className = "marcador-vs";
  marcadorVs.textContent = "VS";

  const marcadorO = document.createElement("div");
  marcadorO.className = "marcador-item jugador-o";
  marcadorO.innerHTML = `<span class="marcador-label">Máquina (O)</span><span class="marcador-puntos">0</span>`;

  marcador.append(marcadorX, marcadorVs, marcadorO);

  const turnoInfo = document.createElement("div");
  turnoInfo.className = "turno-info";
  turnoInfo.textContent = "Presiona INICIAR para comenzar";

  infoPanel.append(marcador, turnoInfo);

  const tableroElement = document.createElement("div");
  tableroElement.className = "tablero-ter";

  const casillas = [];
  for (let i = 0; i < 9; i++) {
    const casilla = document.createElement("div");
    casilla.className = "casilla";
    casilla.dataset.index = i;
    casillas.push(casilla);
    tableroElement.appendChild(casilla);
  }

  const menuControles = document.createElement("div");
  menuControles.className = "menu-controles";

  const buttonIniciar = document.createElement("button");
  buttonIniciar.textContent = "Iniciar";
  buttonIniciar.className = "button-iniciar";

  const buttonVolver = document.createElement("button");
  buttonVolver.textContent = "Volver al Menu";
  buttonVolver.className = "button-volver";

  menuControles.append(buttonIniciar, buttonVolver);

  let tablero = Array(9).fill(null);
  let turnoActual = JUGADORES.X;
  let juegoActivo = false;
  let victoriasX = 0;
  let victoriasO = 0;

  const actualizarMarcador = () => {
    marcadorX.querySelector(".marcador-puntos").textContent = victoriasX;
    marcadorO.querySelector(".marcador-puntos").textContent = victoriasO;
  };
};
