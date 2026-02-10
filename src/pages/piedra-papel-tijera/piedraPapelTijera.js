import "./piedraPapelTijera.css";
import {
  OPCIONES,
  RESULTADOS,
  generarEleccionMaquina,
  determinarGanador,
  obtenerIcono,
  obtenerMensajeResultado,
} from "./pptLogica.js";
import { crearMarcadorItem, crearZona } from "./pptComponentes.js";

export const initPiedraPapelTijera = (divApp) => {
  const pptContainer = document.createElement("div");
  pptContainer.className = "ppt-container";

  const tituloGame = document.createElement("h2");
  tituloGame.textContent = "PIEDRA PAPEL TIJERA";

  const infoPanel = document.createElement("div");
  infoPanel.className = "info-panel-ppt";

  const marcador = document.createElement("div");
  marcador.className = "marcador";

  const marcadorJugador = crearMarcadorItem("jugador", "Jugador");
  const marcadorVs = document.createElement("div");
  marcadorVs.className = "marcador-vs";
  marcadorVs.textContent = "VS";
  const marcadorMaquina = crearMarcadorItem("maquina", "Máquina");

  marcador.append(marcadorJugador, marcadorVs, marcadorMaquina);

  const turnoInfo = document.createElement("div");
  turnoInfo.className = "turno-info";
  turnoInfo.textContent = "Presiona INICIAR para comenzar";

  const mensajeResultado = document.createElement("div");
  mensajeResultado.className = "mensaje-resultado";

  infoPanel.append(marcador, turnoInfo, mensajeResultado);

  const areaJuego = document.createElement("div");
  areaJuego.className = "area-juego";

  const { zona: zonaJugador, display: eleccionJugadorDisplay } = crearZona("zona-jugador", "Tu elección");
  const zonaVs = document.createElement("div");
  zonaVs.className = "zona-vs";
  zonaVs.textContent = "VS";
  const { zona: zonaMaquina, display: eleccionMaquinaDisplay } = crearZona("zona-maquina", "Máquina");

  areaJuego.append(zonaJugador, zonaVs, zonaMaquina);

  const tableroOpciones = document.createElement("div");
  tableroOpciones.className = "tablero-opciones";

  const opcionesConfig = Object.values(OPCIONES).map((nombre) => ({
    nombre,
    icono: obtenerIcono(nombre),
    color: nombre,
  }));

  opcionesConfig.forEach((opcion) => {
    const boton = document.createElement("button");
    boton.className = `ppt-boton ${opcion.color}`;
    boton.dataset.opcion = opcion.nombre;
    boton.innerHTML = `<span class="boton-icono">${opcion.icono}</span><span class="boton-texto">${opcion.nombre.toUpperCase()}</span>`;
    boton.disabled = true;
    tableroOpciones.appendChild(boton);
  });

  const menuControles = document.createElement("div");
  menuControles.className = "menu-controles";

  const buttonIniciar = document.createElement("button");
  buttonIniciar.textContent = "Iniciar";
  buttonIniciar.className = "button-iniciar";

  const buttonVolver = document.createElement("button");
  buttonVolver.textContent = "Volver al Menu";
  buttonVolver.className = "button-volver";

  menuControles.append(buttonIniciar, buttonVolver);

  let puntosJugador = 0;
  let puntosMaquina = 0;
  let partidaNumero = 0;
  let juegoActivo = false;
  let esperandoInput = false;
  let jugadorInicia = true;
  let eleccionMaquinaOculta = null;

  const actualizarMarcador = () => {
    marcadorJugador.querySelector(".marcador-puntos").textContent =
      puntosJugador;
    marcadorMaquina.querySelector(".marcador-puntos").textContent =
      puntosMaquina;
  };

  const resetearDisplay = () => {
    eleccionJugadorDisplay.textContent = "?";
    eleccionJugadorDisplay.classList.remove("revelado");
    eleccionMaquinaDisplay.textContent = "?";
    eleccionMaquinaDisplay.classList.remove("revelado");
    mensajeResultado.textContent = "";
    mensajeResultado.className = "mensaje-resultado";
    eleccionMaquinaOculta = null;
  };

  const habilitarBotones = (habilitar) => {
    tableroOpciones.querySelectorAll(".ppt-boton").forEach((boton) => {
      boton.disabled = !habilitar;
    });
  };

  const iniciarJuego = () => {
    puntosJugador = 0;
    puntosMaquina = 0;
    partidaNumero = 0;
    juegoActivo = true;
    jugadorInicia = true;
    actualizarMarcador();
    resetearDisplay();
    buttonIniciar.disabled = true;
    iniciarRonda();
  };

  const iniciarRonda = () => {
    partidaNumero++;
    resetearDisplay();
    esperandoInput = true;

    const quienInicia = jugadorInicia ? "Jugador" : "Máquina";
    turnoInfo.textContent = `Ronda ${partidaNumero} - Inicia: ${quienInicia}`;

    if (jugadorInicia) {
      turnoInfo.textContent += " - ¡Elige tu jugada!";
      habilitarBotones(true);
    } else {
      turnoInfo.textContent += " - La máquina está eligiendo...";
      habilitarBotones(false);
      setTimeout(() => {
        eleccionMaquinaOculta = generarEleccionMaquina();
        turnoInfo.textContent = `Ronda ${partidaNumero} - La máquina ya eligió. ¡Tu turno!`;
        habilitarBotones(true);
      }, 1000);
    }
  };

  const revelarEleccionMaquina = (eleccion) => {
    eleccionMaquinaDisplay.textContent = obtenerIcono(eleccion);
    eleccionMaquinaDisplay.classList.add("revelado");
  };

  const procesarEleccion = (eleccionJugador) => {
    if (!juegoActivo || !esperandoInput) return;
    esperandoInput = false;
    habilitarBotones(false);

    eleccionJugadorDisplay.textContent = obtenerIcono(eleccionJugador);
    eleccionJugadorDisplay.classList.add("revelado");

    if (jugadorInicia) {
      turnoInfo.textContent = "La máquina está eligiendo...";
      setTimeout(() => {
        const eleccionMaquina = generarEleccionMaquina();
        revelarEleccionMaquina(eleccionMaquina);
        resolverRonda(eleccionJugador, eleccionMaquina);
      }, 1000);
    } else {
      revelarEleccionMaquina(eleccionMaquinaOculta);
      resolverRonda(eleccionJugador, eleccionMaquinaOculta);
    }
  };

  const resolverRonda = (eleccionJugador, eleccionMaquina) => {
    const resultado = determinarGanador(eleccionJugador, eleccionMaquina);

    if (resultado === RESULTADOS.JUGADOR_GANA) {
      puntosJugador++;
      mensajeResultado.className = "mensaje-resultado victoria";
    } else if (resultado === RESULTADOS.MAQUINA_GANA) {
      puntosMaquina++;
      mensajeResultado.className = "mensaje-resultado derrota";
    } else {
      mensajeResultado.className = "mensaje-resultado empate";
    }

    mensajeResultado.textContent = obtenerMensajeResultado(resultado);
    actualizarMarcador();
    turnoInfo.textContent = `Ronda ${partidaNumero} finalizada`;

    jugadorInicia = !jugadorInicia;

    setTimeout(() => {
      iniciarRonda();
    }, 2500);
  };

  tableroOpciones.addEventListener("click", (e) => {
    const boton = e.target.closest(".ppt-boton");
    if (!boton || boton.disabled) return;
    const opcionElegida = boton.dataset.opcion;
    procesarEleccion(opcionElegida);
  });

  buttonIniciar.addEventListener("click", iniciarJuego);
  buttonVolver.addEventListener("click", () => {
    window.location.hash = "/";
  });

  pptContainer.append(
    tituloGame,
    infoPanel,
    areaJuego,
    tableroOpciones,
    menuControles,
  );
  divApp.innerHTML = "";
  divApp.appendChild(pptContainer);
};

export default initPiedraPapelTijera;
