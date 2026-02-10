export const OPCIONES = {
  PIEDRA: "piedra",
  PAPEL: "papel",
  TIJERA: "tijera",
};

export const RESULTADOS = {
  JUGADOR_GANA: "jugador",
  MAQUINA_GANA: "maquina",
  EMPATE: "empate",
};

export const generarEleccionMaquina = () => {
  const opciones = Object.values(OPCIONES);
  const indiceAleatorio = Math.floor(Math.random() * opciones.length);
  return opciones[indiceAleatorio];
};

export const determinarGanador = (eleccionJugador, eleccionMaquina) => {
  if (eleccionJugador === eleccionMaquina) {
    return RESULTADOS.EMPATE;
  }

  const ganaJugador =
    (eleccionJugador === OPCIONES.PIEDRA && eleccionMaquina === OPCIONES.TIJERA) ||
    (eleccionJugador === OPCIONES.PAPEL && eleccionMaquina === OPCIONES.PIEDRA) ||
    (eleccionJugador === OPCIONES.TIJERA && eleccionMaquina === OPCIONES.PAPEL);

  return ganaJugador ? RESULTADOS.JUGADOR_GANA : RESULTADOS.MAQUINA_GANA;
};

export const obtenerIcono = (opcion) => {
  const iconos = {
    [OPCIONES.PIEDRA]: "✊",
    [OPCIONES.PAPEL]: "✋",
    [OPCIONES.TIJERA]: "✌️",
  };
  return iconos[opcion] || "";
};

export const obtenerMensajeResultado = (resultado, esJugadorInicia) => {
  const mensajes = {
    [RESULTADOS.JUGADOR_GANA]: "¡Ganaste esta ronda!",
    [RESULTADOS.MAQUINA_GANA]: "¡La máquina gana esta ronda!",
    [RESULTADOS.EMPATE]: "¡Empate! Nadie gana esta ronda",
  };
  return mensajes[resultado];
};
