export const crearMarcadorItem = (clase, label) => {
  const item = document.createElement("div");
  item.className = `marcador-item ${clase}`;
  item.innerHTML = `<span class="marcador-label">${label}</span><span class="marcador-puntos">0</span>`;
  return item;
};

export const crearZona = (clase, labelTexto) => {
  const zona = document.createElement("div");
  zona.className = clase;
  const label = document.createElement("div");
  label.className = "zona-label";
  label.textContent = labelTexto;
  const display = document.createElement("div");
  display.className = `eleccion-display ${clase.replace("zona-", "")}-eleccion`;
  display.textContent = "?";
  zona.append(label, display);
  return { zona, display };
};
