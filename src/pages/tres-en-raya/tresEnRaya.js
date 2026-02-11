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

  const renderizarTablero = () => {
    casillas.forEach((casilla, index) => {
      casilla.textContent = tablero[index] || "";
      casilla.className = "casilla";
      if (tablero[index] === JUGADORES.X) casilla.classList.add("marca-x");
      if (tablero[index] === JUGADORES.O) casilla.classList.add("marca-o");
    });
  };

  const resetearTablero = () => {
    tablero = Array(9).fill(null);
    turnoActual = JUGADORES.X;
    renderizarTablero();
  };

  const iniciarJuego = () => {
    victoriasX = 0;
    victoriasO = 0;
    juegoActivo = true;
    actualizarMarcador();
    resetearTablero();
    buttonIniciar.disabled = true;
    turnoInfo.textContent = "Tu turno — Coloca tu X";
  };

  const resaltarGanador = (linea) => {
    linea.forEach((index) => {
      casillas[index].classList.add("ganadora");
    });
  };

  const procesarResultado = (resultado, linea) => {
    if (resultado === RESULTADOS.GANA_X) {
      victoriasX++;
      turnoInfo.textContent = "¡Ganaste esta ronda!";
      resaltarGanador(linea);
    } else if (resultado === RESULTADOS.GANA_O) {
      victoriasO++;
      turnoInfo.textContent = "¡La máquina gana esta ronda!";
      resaltarGanador(linea);
    } else if (resultado === RESULTADOS.EMPATE) {
      turnoInfo.textContent = "!Empate¡";
    }
  };

  actualizarMarcador();
  juegoActivo = false;

  setTimeout(() => {
    resetearTablero();
    juegoActivo = true;
    turnoInfo.textContent = "Tu Turno - Coloca tu X";
  }, 2000);

  const turnoMaquina = () => {
    turnoInfo.textContent = "La máquina esta pensando...";
    setTimeout(() => {
      const indexMaquina = jugadaMaquina(tablero);
      tablero[indexMaquina] = JUGADORES.O;
      renderizarTablero();
      const { resultado, linea } = comprobarGanador(tablero);
      if (resultado !== RESULTADOS.CONTINUA) {
        procesarResultado(resultado, linea);
        return;
      }

      turnoActual = JUGADORES.X;
      turnoInfo.textContent = "Tu turno — Coloca tu X";
    }, 600);
  };

  tableroElement.addEventListener("click", (e) => {
    const casilla = e.target.closest(".casilla");
    if (!casilla || !juegoActivo) return;

    const index = parseInt(casilla.dataset.index);

    if (tablero[index] !== null || turnoActual !== JUGADORES.X) return;

    tablero[index] = JUGADORES.X;
    renderizarTablero();

    const { resultado, linea } = comprobarGanador(tablero);
    if (resultado !== RESULTADOS.CONTINUA) {
      procesarResultado(resultado, linea);
      return;
    }

    turnoActual = JUGADORES.O;
    turnoMaquina();
  });

terContainer.append(tituloGame, infoPanel, tableroElement,menuControles)
divApp.innerHTML = ""
divApp.appendChild(terContainer)

};

export default initTresEnRaya
