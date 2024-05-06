import {
  generarNumeroCarta,
  obtenerMensajePuntuacion,
  obtenerNumeroAleatorio,
  obtenerPuntosCarta,
  obtenerUrlCarta,
} from "./motor";
import { partida } from "./model";

export const imagenCarta = document.getElementById("imagenCarta");
export const btnDameCarta = document.getElementById("dameCarta");
export const btnPlantarse = document.getElementById("plantarse");
const btnNuevaPartida = document.getElementById("restart");
export const btnVerResultado = document.getElementById("verResultado");
export const divPuntuacion = document.getElementById("puntuacion");
const divNuevaPartida = document.getElementById("nuevaPartida");

export const dameCarta = (): void => {
  const numeroAleatorio = obtenerNumeroAleatorio();
  const cartaGenerada = generarNumeroCarta(numeroAleatorio);
  const urlCarta = obtenerUrlCarta(cartaGenerada);
  mostrarCartaEnHTML(urlCarta);
  actualizarPuntuacion(cartaGenerada);
  comprobarPuntuacion();
};

export const plantarse = (): void => {
  deshabilitarBotones();
  const mensaje = obtenerMensajePuntuacion(partida.puntuacion);
  if (divPuntuacion !== null && divPuntuacion !== undefined && divPuntuacion instanceof HTMLDivElement) {
    divPuntuacion.innerHTML = `Tu puntuación fue ${partida.puntuacion}. ${mensaje}`;
  }
  comprobarPuntuacion();
  mostrarNuevaPartida();
  if (btnVerResultado !== null && btnVerResultado !== undefined && btnVerResultado instanceof HTMLButtonElement) {
    btnVerResultado.hidden = false;
    btnVerResultado.addEventListener("click", verResultado);
  }
};

export const comprobarPuntuacion = (): void => {
  if (partida.puntuacion > 7.5) {
    finalizarJuego();
  }
};

export const actualizarPuntuacion = (carta: number): void => {
  partida.puntuacion += obtenerPuntosCarta(carta);
  mostrarPuntuacion();
};

export const resetearPuntuacion = (): void => {
  partida.puntuacion = 0;
};

export const mostrarCartaEnHTML = (url: string): void => {
  if (imagenCarta != null && imagenCarta !== undefined && imagenCarta instanceof HTMLImageElement) {
    imagenCarta.src = url;
    imagenCarta.classList.add("card-animation");
    imagenCarta.addEventListener(
      "animationend",
      () => {
        imagenCarta.classList.remove("card-animation");
      },
      { once: true }
    );
  }
};

export const mostrarPuntuacion = (): void => {
  if (divPuntuacion !== null && divPuntuacion !== undefined && divPuntuacion instanceof HTMLDivElement) {
    divPuntuacion.innerHTML = `Tu puntuación actual es: ${partida.puntuacion.toString()}`;
  }
};

export const finalizarJuego = (): void => {
  if (divPuntuacion !== null && divPuntuacion !== undefined && divPuntuacion instanceof HTMLDivElement) {
    divPuntuacion.innerHTML = `Tu puntuación es ${partida.puntuacion.toString()}, <strong>GAME OVER</strong>`;
  }
  deshabilitarBotones();
  mostrarNuevaPartida();
};

const deshabilitarBotones = (): void => {
  if (
    btnDameCarta !== null &&
    btnDameCarta !== undefined &&
    btnDameCarta instanceof HTMLButtonElement &&
    btnPlantarse !== null &&
    btnPlantarse !== undefined &&
    btnPlantarse instanceof HTMLButtonElement
  ) {
    btnDameCarta.disabled = true;
    btnPlantarse.disabled = true;
  }
};

const verResultado = (): void => {
  dameCarta();
  if (partida.puntuacion > 7.5 && divPuntuacion !== null) {
    divPuntuacion.innerHTML = `Tu puntuación es ${partida.puntuacion.toString()}, <strong>GAME OVER</strong>`;
  }
  if (btnVerResultado !== null && btnVerResultado !== undefined && btnVerResultado instanceof HTMLButtonElement) {
    btnVerResultado.hidden = true;
  }
};

const mostrarNuevaPartida = (): void => {
  if (
    divNuevaPartida !== null &&
    btnNuevaPartida !== null &&
    btnNuevaPartida !== undefined &&
    btnNuevaPartida instanceof HTMLButtonElement
  ) {
    btnNuevaPartida.hidden = false;
    btnNuevaPartida.addEventListener("click", reiniciar);
  }
};

const reiniciar = (): void => {
  resetearPuntuacion();
  if (imagenCarta !== null && imagenCarta !== undefined && imagenCarta instanceof HTMLImageElement) {
    imagenCarta.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
  if (btnDameCarta !== null && btnDameCarta !== undefined && btnDameCarta instanceof HTMLButtonElement) {
    btnDameCarta.disabled = false;
  }
  if (btnPlantarse !== null && btnPlantarse !== undefined && btnPlantarse instanceof HTMLButtonElement) {
    btnPlantarse.disabled = false;
  }
  if (btnNuevaPartida !== null && btnNuevaPartida !== undefined && btnNuevaPartida instanceof HTMLButtonElement) {
    btnNuevaPartida.hidden = true;
  }
  if (btnVerResultado !== null && btnVerResultado !== undefined && btnVerResultado instanceof HTMLButtonElement) {
    btnVerResultado.hidden = true;
  }
  mostrarPuntuacion();
};
