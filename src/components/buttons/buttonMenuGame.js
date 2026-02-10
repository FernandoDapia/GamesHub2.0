import "./buttonMenuGame.css";

export const createGameButton = (gameName, ruta) => {
  const button = document.createElement("button");
  button.textContent = gameName;
  button.className = "game-btn";
  button.addEventListener("click", () => {
    window.location.hash = ruta;
  });
  return button;
};
