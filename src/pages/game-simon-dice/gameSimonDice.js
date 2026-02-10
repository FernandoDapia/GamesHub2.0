import "./gameSimonDice.css";

export const initGameSimonDice = (divApp) => {
  const simonContainer = document.createElement("div");
  simonContainer.className = "simon-container";

  const tituloGame = document.createElement("h2");
  tituloGame.textContent = "SIMON DICE";

  const infoPanel = document.createElement("div");
  infoPanel.className = "info-panel";

  const infoNivel = document.createElement("div");
  infoNivel.className = "info-nivel";
  infoNivel.textContent = "Nivel: 0";

  const mensajeStart = document.createElement("div");
  mensajeStart.className = "mensaje-start";
  mensajeStart.textContent = "Presiona INICIAR para comenzar";

  infoPanel.append(infoNivel, mensajeStart);

  const tableroSimon = document.createElement("div");
  tableroSimon.className = "tablero-simon";

  const colorsGame = ["rojo", "verde", "azul", "amarillo"];
  const buttonsGame = [];

  colorsGame.forEach((color, index) => {
    const button = document.createElement("div");
    button.className = `simon-button ${color}`;
    button.dataset.color = index;
    buttonsGame.push(button);
    tableroSimon.appendChild(button);
  });

  const menuControles = document.createElement("div");
  menuControles.className = "menu-controles";

  const buttonIniciar = document.createElement("button");
  buttonIniciar.textContent = "Iniciar";
  buttonIniciar.className = "button-iniciar .button-control";

  const buttonVolver = document.createElement("button");
  buttonVolver.textContent = "Volver al Menu";
  buttonVolver.className = "button-volver .button-control";

  menuControles.append(buttonIniciar, buttonVolver);

  let secuenciaJuego = [];
  let secuenciaJugador = [];
  let nivel = 0;
  let esperandoInput = false;
  let juegoActivo = false;

  const iniciarJuego = () => {
    secuenciaJuego = [];
    secuenciaJugador = [];
    nivel = 0;
    juegoActivo = true;
    esperandoInput = false;

    mensajeStart.textContent = "¡Observa la secuencia!";
    infoNivel.textContent = "Nivel: 0";
    buttonIniciar.disabled = true;
    setTimeout(() => {
      siguienteNivel();
    }, 1000);
  };

  const siguienteNivel = () => {
    nivel++;
    infoNivel.textContent = `Nivel: ${nivel}`;
    secuenciaJugador = [];
    esperandoInput = false;
    const colorAleatorio = Math.floor(Math.random() * 4);
    secuenciaJuego.push(colorAleatorio);
    mensajeStart.textContent = "!Observa!";
    setTimeout(() => {
      mostrarSecuencia();
    }, 500);
  };

  const mostrarSecuencia = () => {
    let delay = 0;
    secuenciaJuego.forEach((colorIndex) => {
      setTimeout(() => {
        iluminarBoton(colorIndex);
      }, delay);

      delay += 800;
    });
    setTimeout(() => {
      esperandoInput = true;
      mensajeStart.textContent = "¡Tu turno! Repite la secuencia";
    }, delay);
  };
  

  const iluminarBoton = (index) => {
    const boton = buttonsGame[index];
    boton.classList.add("activo");
    setTimeout(() => {
      boton.classList.remove("activo");
    }, 400);
  };

  const procesarClick = (e) => {
    if (!juegoActivo || !esperandoInput) return;
    const botonClickeado = e.target;
    if (!botonClickeado.classList.contains("simon-button")) return;
    const colorIndex = parseInt(botonClickeado.dataset.color);
    iluminarBoton(colorIndex);
    secuenciaJugador.push(colorIndex);
    verificarJugada(secuenciaJugador.length - 1);
  };

  const verificarJugada = (index) => {
    if (secuenciaJugador[index] !== secuenciaJuego[index]) {
      gameOver();
      return;
    }
    if (secuenciaJugador.length === secuenciaJuego.length) {
      esperandoInput = false;
      mensajeStart.textContent = "¡Correcto! Siguiente nivel...";
      setTimeout(() => {
        siguienteNivel();
      }, 1500);
    }
  };

  const gameOver = () => {
    juegoActivo = false;
    esperandoInput = false;
    mensajeStart.textContent = `¡Game Over! Alcanzaste el nivel ${nivel}`;
    mensajeStart.style.color = "#ff4444";
    buttonsGame.forEach((boton) => {
      boton.classList.add("error");
    });

    setTimeout(() => {
      buttonsGame.forEach((boton) => {
        boton.classList.remove("error");
      });
      mensajeStart.style.color = "#333";
      buttonIniciar.disabled = false;
    }, 1500);
  };

  buttonIniciar.addEventListener("click", iniciarJuego);
  tableroSimon.addEventListener("click", procesarClick);
  buttonVolver.addEventListener("click", () => {
    window.location.hash = "/";
  });

  simonContainer.append(tituloGame, infoPanel, tableroSimon, menuControles);
  divApp.innerHTML = "";
  divApp.appendChild(simonContainer);
};

export default initGameSimonDice;
