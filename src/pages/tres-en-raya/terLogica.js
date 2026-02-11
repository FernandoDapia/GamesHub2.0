export const JUGADORES = {
  X: "X",
  O: "O",
};

export const RESULTADOS = {
  GANA_X: "gana_x",
  GANA_O: "gana_o",
  EMPATE: "empate",
  CONTINUA: "continua",
};

const COMBINACIONES_GANADORAS = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8],
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6], 
];

export const comprobarGanador = (tablero) => {
  for (const [a, b, c] of COMBINACIONES_GANADORAS) {
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      return {
        resultado:
          tablero[a] === JUGADORES.X ? RESULTADOS.GANA_X : RESULTADOS.GANA_O,
        linea: [a, b, c],
      };
    }
  }
  if (tablero.every((casilla) => casilla !== null)) {
    return {
      resultado: RESULTADOS.EMPATE,
      linea: null,
    };
  }
  return { resultado: RESULTADOS.CONTINUA, linea: null };
};

export const jugadaMaquina = (tablero) => {
  const vacias = tablero
    .map((valor, index) => (valor === null ? index : null))
    .filter((index) => index !== null);

  const indiceAleatorio = Math.floor(Math.random() * vacias.length);
  return vacias[indiceAleatorio];
};
