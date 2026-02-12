# GameHub 2.0

Plataforma web de minijuegos clásicos construida con JavaScript vanilla y Vite. Incluye tres juegos con persistencia de datos mediante localStorage.

## Tecnologías

- JavaScript (ES Modules)
- HTML5 / CSS3
- Vite 7
- localStorage para persistencia de datos

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Entrar al directorio del proyecto
cd GameHub2.0

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Estructura del proyecto

```
src/
├── main.js                          # Punto de entrada
├── router.js                        # Sistema de rutas basado en hash
├── style.css                        # Estilos globales
├── components/
│   └── buttons/
│       └── buttonMenuGame.js        # Componente de botón reutilizable
└── pages/
    ├── pantalla-inicio/             # Menú principal
    ├── piedra-papel-tijera/         # Juego de Piedra, Papel o Tijera
    │   ├── piedraPapelTijera.js     # UI y flujo del juego
    │   ├── pptLogica.js             # Reglas y utilidades
    │   └── pptComponentes.js        # Componentes reutilizables
    ├── game-simon-dice/             # Juego de Simon Dice
    │   └── gameSimonDice.js         # Lógica completa del juego
    └── tres-en-raya/                # Juego de Tres en Raya
        ├── tresEnRaya.js            # UI y flujo del juego
        └── terLogica.js             # Reglas y combinaciones ganadoras
```

## Juegos

### Piedra, Papel o Tijera

Juego clásico contra la máquina con turnos alternados. Cada ronda, uno de los dos jugadores elige primero. Se guardan las puntuaciones y el estado de la partida entre recargas.

### Simon Dice

Juego de memoria donde debes repetir secuencias de colores cada vez más largas. El nivel y la secuencia se guardan para que puedas continuar tras recargar la página.

### Tres en Raya

Tres en raya contra la máquina. El tablero, el turno actual y el marcador de victorias se mantienen entre recargas.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la build de producción |
| `npm run preview` | Previsualiza la build de producción |

## Autor

Fernando Dapía Rodriguez 
